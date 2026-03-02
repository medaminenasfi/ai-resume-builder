import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, DeleteDateColumn, BeforeUpdate } from 'typeorm';
import { Exclude } from 'class-transformer';
import { RoleEnum } from '../enums/role.enum';
import { StatusEnum } from '../enums/status.enum';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()
  passwordHash: string;

  @Column({
    type: 'enum',
    enum: RoleEnum,
    default: RoleEnum.USER,
  })
  role: RoleEnum;

  @Column({
    type: 'enum',
    enum: StatusEnum,
    default: StatusEnum.PENDING,
  })
  status: StatusEnum;

  @Column({ default: false })
  emailVerified: boolean;

  @Column({ nullable: true })
  oauthProvider: string;

  @Column({ nullable: true })
  firstName: string;

  @Column({ nullable: true })
  lastName: string;

  @Column({ nullable: true })
  phone?: string;

  @CreateDateColumn()
  createdAt: Date;

  @Column({ nullable: true })
  lastLoginAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedAt = new Date();
  }

  // Methods
  login(password: string): boolean {
    // This would be handled by the service
    return true;
  }

  logout(): void {
    // This would be handled by the service
  }

  resetPassword(token: string, password: string): void {
    // This would be handled by the service
  }

  getEntitlements(): any[] {
    // This would be handled by the service
    return [];
  }

  softDelete(): void {
    this.deletedAt = new Date();
  }
}
