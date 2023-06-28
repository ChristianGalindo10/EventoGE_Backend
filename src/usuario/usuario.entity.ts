import {
    Column,
    Entity,
    JoinColumn,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from 'typeorm';
  
  
  @Entity()
  export class Usuario {
    @PrimaryGeneratedColumn()
    id_usuario: number;
  
    @Column({ type: 'varchar', length: 10 })
    tipo_documento: string;
    
    @Column({ type: 'varchar', length: 30 })
    documento: string;
  
    @Column({ type: 'bigint'})
    telefono: number;
  
    @Column({ type: 'varchar', length: 100 })
    nombre: string;
    
    @Column({ type: 'varchar', length: 50 })
    correo: string;
    
  }
  