import { Injectable } from '@nestjs/common';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { EntityRepository, wrap } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Transaction } from './entities/transaction.entity';
import { EntityManager } from '@mikro-orm/postgresql';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: EntityRepository<Transaction>,
    private readonly em: EntityManager,
  ) {}

  async create(createTransactionDto: CreateTransactionDto) {
    const createdTransaction =
      this.transactionRepository.create(createTransactionDto);
    return await this.transactionRepository.insert(createdTransaction);
  }

  async findAll() {
    return await this.transactionRepository.findAll();
  }

  async findOneById(id: number) {
    return await this.transactionRepository.findOne({ id });
  }

  async update(id: number, updateTransactionDto: UpdateTransactionDto) {
    const existingTransaction = await this.transactionRepository.findOne({
      id,
    });
    wrap(existingTransaction).assign(updateTransactionDto);
    const result = await this.transactionRepository
      .getEntityManager()
      .persistAndFlush(existingTransaction);
    return result;
  }

  async remove(id: number) {
    const transaction = await this.transactionRepository.findOne({ id });
    await this.transactionRepository.nativeDelete(transaction);
  }

  async getMonthlyCategorySums(userId: number) {
    const result = await this.em.execute(
      `
        SELECT 
          CASE 
              WHEN c."is_highlight" THEN c.name 
              ELSE 'Other' 
          END AS category_name,
          COALESCE(SUM(t.amount), 0) AS total_amount
        FROM 
            category c
        LEFT JOIN 
            transaction t ON t.category_id = c.id AND
            t.user_id = ? AND
            DATE_TRUNC('month', t.transaction_date) = DATE_TRUNC('month', CURRENT_DATE)
        GROUP BY 
            CASE 
                WHEN c."is_highlight" THEN c.name 
                ELSE 'Other' 
            END
        ORDER BY category_name;
      `,
      [userId],
    );

    return result;
  }

  async getTopTwoExpensesPerCategory(userId: number) {
    const result = await this.em.execute(
      `
        WITH TransactionsData AS (
            SELECT 
                t.*,
                CASE 
                    WHEN c."is_highlight" THEN c.name 
                    ELSE 'Other' 
                END AS category_name
            FROM 
                category c
            JOIN 
                transaction t ON t.category_id = c.id AND
                t.user_id = ? AND
                DATE_TRUNC('month', t.transaction_date) = DATE_TRUNC('month', CURRENT_DATE)
            WHERE 
                t.type = 'expense'
        ), 

        CategorizedTransactions AS (
            SELECT 
                ct.*,
                ROW_NUMBER() OVER (PARTITION BY ct.category_name ORDER BY ct.amount DESC) AS rn
            FROM 
                TransactionsData ct
        )

        SELECT 
            ct.category_name,
            ct.id,
            ct.amount,
            ct.item,
            ct.description,
            ct.transaction_date,
            ct.rn
        FROM 
            CategorizedTransactions ct
        WHERE 
            ct.rn <= 2
        ORDER BY 
            ct.category_name, ct.amount DESC;
      `,
      [userId],
    );

    return result;
  }
}
