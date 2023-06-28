import {MigrationInterface, QueryRunner} from "typeorm";

export class relacionesProyectoUsuario1655234619161 implements MigrationInterface {
    name = 'relacionesProyectoUsuario1655234619161'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "estado_tarea" ("id_estado" SERIAL NOT NULL, "nombre" character varying(50) NOT NULL, CONSTRAINT "PK_438ea263f5288f1c0ec59d044c9" PRIMARY KEY ("id_estado"))`);
        await queryRunner.query(`CREATE TABLE "usuario_proyecto_tarea" ("id_usuario_proyecto_tarea" SERIAL NOT NULL, "fk_id_usuario_proyecto" integer, "fk_id_tarea" integer, CONSTRAINT "PK_fc9b6d854c04371bd6350c0b2d6" PRIMARY KEY ("id_usuario_proyecto_tarea"))`);
        await queryRunner.query(`CREATE TABLE "usuario_proyecto" ("id_usuario_proyecto" SERIAL NOT NULL, "fecha_asignacion" date, "fecha_retiro" date, "fk_id_usuario" integer, "fk_id_proyecto" integer, CONSTRAINT "PK_5105f64327ce1dd7fbafed153ce" PRIMARY KEY ("id_usuario_proyecto"))`);
        await queryRunner.query(`ALTER TABLE "reporte_horas" ADD CONSTRAINT "FK_6cad1743144542bb55952f7062e" FOREIGN KEY ("fk_usuario_proyecto_tarea") REFERENCES "usuario_proyecto_tarea"("id_usuario_proyecto_tarea") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "tarea" ADD CONSTRAINT "FK_19502b8cea14f71cf24c4517351" FOREIGN KEY ("fk_estado_tarea") REFERENCES "estado_tarea"("id_estado") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_proyecto_tarea" ADD CONSTRAINT "FK_969f3dbbb559b01b9c0df527c2d" FOREIGN KEY ("fk_id_usuario_proyecto") REFERENCES "usuario_proyecto"("id_usuario_proyecto") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_proyecto_tarea" ADD CONSTRAINT "FK_2844e466b063078c5bd4a947df3" FOREIGN KEY ("fk_id_tarea") REFERENCES "tarea"("id_tarea") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_proyecto" ADD CONSTRAINT "FK_310d26c5eaca4e7a40b48d42928" FOREIGN KEY ("fk_id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "usuario_proyecto" ADD CONSTRAINT "FK_b98a66fb6f65ffdb9451fde9aaa" FOREIGN KEY ("fk_id_proyecto") REFERENCES "proyecto"("id_proyecto") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "usuario_proyecto" DROP CONSTRAINT "FK_b98a66fb6f65ffdb9451fde9aaa"`);
        await queryRunner.query(`ALTER TABLE "usuario_proyecto" DROP CONSTRAINT "FK_310d26c5eaca4e7a40b48d42928"`);
        await queryRunner.query(`ALTER TABLE "usuario_proyecto_tarea" DROP CONSTRAINT "FK_2844e466b063078c5bd4a947df3"`);
        await queryRunner.query(`ALTER TABLE "usuario_proyecto_tarea" DROP CONSTRAINT "FK_969f3dbbb559b01b9c0df527c2d"`);
        await queryRunner.query(`ALTER TABLE "tarea" DROP CONSTRAINT "FK_19502b8cea14f71cf24c4517351"`);
        await queryRunner.query(`ALTER TABLE "reporte_horas" DROP CONSTRAINT "FK_6cad1743144542bb55952f7062e"`);
        await queryRunner.query(`DROP TABLE "usuario_proyecto"`);
        await queryRunner.query(`DROP TABLE "usuario_proyecto_tarea"`);
        await queryRunner.query(`DROP TABLE "estado_tarea"`);
    }

}
