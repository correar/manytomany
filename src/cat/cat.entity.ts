import { Column, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cloth } from '../cloth/cloth.entity';
@Entity('cat')
export class Cat {
 @PrimaryGeneratedColumn({
 type: 'int',
 name: 'id',
 })
id: number;

@Column('varchar', {
    nullable: false,
    name: 'name',
})
name: string;

@ManyToMany(type => Cloth, { cascade: true })
@JoinTable({
    name: 'cat_use_cloth',
    joinColumn: { name: 'cat_id', referencedColumnName: 'id'},
    inverseJoinColumn: { name: 'cloth_id', referencedColumnName: 'id'},
})
cloths: Cloth[];
}
