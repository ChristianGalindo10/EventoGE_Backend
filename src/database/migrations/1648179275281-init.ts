import { MigrationInterface, QueryRunner } from 'typeorm';

export class init1648179275281 implements MigrationInterface {
  name = 'init1648179275281';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "estado_proyecto" ("id_estadoP" SERIAL NOT NULL, "nombre_estado_proyecto" character varying(50) NOT NULL, CONSTRAINT "PK_c7116f37e8176843b03f9c01b24" PRIMARY KEY ("id_estadoP"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "pais" ("id_pais" SERIAL NOT NULL, "nombre" character varying(50) NOT NULL, CONSTRAINT "PK_c006554b8b95782a5b725144b20" PRIMARY KEY ("id_pais"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "proyecto" ("id_proyecto" SERIAL NOT NULL, "nombre_proyecto" character varying(50) NOT NULL, "fk_pais" integer, "fk_estado_proyecto" integer, CONSTRAINT "PK_5ecc7af27ab7fa5ed5243d437c4" PRIMARY KEY ("id_proyecto"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tarea" ("id_tarea" SERIAL NOT NULL, "nombre_tarea" character varying(50) NOT NULL, "fecha_inicio" TIMESTAMP NOT NULL, "fecha_fin" TIMESTAMP NOT NULL, "fk_proyecto" integer, CONSTRAINT "PK_aa385a04099a3575f7b4dec6894" PRIMARY KEY ("id_tarea"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "reporte_horas" ("id_report" SERIAL NOT NULL, "cantidad_horas" integer NOT NULL, "hora_inicio" TIMESTAMP NOT NULL, "hora_fin" TIMESTAMP NOT NULL, "fk_tarea" integer, "fk_usuario" integer, CONSTRAINT "PK_2fc4096312a85778e805be1ec58" PRIMARY KEY ("id_report"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "estado_usuario" ("id_estadoU" SERIAL NOT NULL, "nombre" character varying(50) NOT NULL, CONSTRAINT "PK_f6eb6f5cb5e3f1eb282d14a694c" PRIMARY KEY ("id_estadoU"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "rol_usuario" ("id_rol" SERIAL NOT NULL, "nombre" character varying(50) NOT NULL, CONSTRAINT "PK_5162b3cd91a9144b2645a767179" PRIMARY KEY ("id_rol"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "comentario_post" ("id_coment" SERIAL NOT NULL, "descripcion_post" character varying(50) NOT NULL, "fecha_comentario" TIMESTAMP NOT NULL, "fk_post" integer, CONSTRAINT "PK_6609f32cbd21d60de6b1505f187" PRIMARY KEY ("id_coment"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "post" ("id_post" SERIAL NOT NULL, "descripcion" character varying(50) NOT NULL, "fecha_post" TIMESTAMP NOT NULL, "archivo" boolean NOT NULL, "url_archivo" character varying(50) NOT NULL, "fk_usuario" integer, CONSTRAINT "PK_95174a9acab3a1f943d34731dec" PRIMARY KEY ("id_post"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "estado_tajada" ("id_estadoT" SERIAL NOT NULL, "descripcion_estado" character varying(50) NOT NULL, CONSTRAINT "PK_32d24929daff3e01d3654e86b0f" PRIMARY KEY ("id_estadoT"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "tajada" ("id_tajada" SERIAL NOT NULL, "descripcion_tajada" character varying(50) NOT NULL, "fecha" TIMESTAMP NOT NULL, "fk_usuario" integer, "estadoTajadaIdEstadoT" integer, CONSTRAINT "PK_be0b2b8642247a9b733a8160649" PRIMARY KEY ("id_tajada"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuario" ("id_usuario" SERIAL NOT NULL, "documento" character varying(20) NOT NULL, "nombres" character varying(50) NOT NULL, "correo" character varying(50) NOT NULL, "correo_corporativo" character varying(50) NOT NULL, "password" character varying(50) NOT NULL, "apellidos" character varying(50) NOT NULL, "telefono" character varying(50) NOT NULL, "direccion" character varying(50) NOT NULL, "fk_rol_usuario" integer, "fk_pais" integer, "fk_estadoU" integer, CONSTRAINT "PK_dd52716c2652e0e23c15530c695" PRIMARY KEY ("id_usuario"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "franja_horaria" ("id_FranjaHoraria" SERIAL NOT NULL, "hora_inicio" TIMESTAMP NOT NULL, "hora_fin" TIMESTAMP NOT NULL, "total_horas" integer NOT NULL, "fk_usuario" integer, CONSTRAINT "PK_4ef6f3aaf956cfe6fadbe4297f0" PRIMARY KEY ("id_FranjaHoraria"))`,
    );
    await queryRunner.query(
      `CREATE TABLE "usuario_tarea" ("fk_id_usuario" integer NOT NULL, "fk_id_tarea" integer NOT NULL, CONSTRAINT "PK_4c49b3d9c2cd8f56cde044823f7" PRIMARY KEY ("fk_id_usuario", "fk_id_tarea"))`,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_c28e58f377895c6b6f8591532b" ON "usuario_tarea" ("fk_id_usuario") `,
    );
    await queryRunner.query(
      `CREATE INDEX "IDX_62af4f261d265a08e7e63b432a" ON "usuario_tarea" ("fk_id_tarea") `,
    );
    await queryRunner.query(
      `ALTER TABLE "proyecto" ADD CONSTRAINT "FK_a987995cd0aeb02dedd6a9e6c0f" FOREIGN KEY ("fk_pais") REFERENCES "pais"("id_pais") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "proyecto" ADD CONSTRAINT "FK_53e3e9f8e0d7940be62ea4643ff" FOREIGN KEY ("fk_estado_proyecto") REFERENCES "estado_proyecto"("id_estadoP") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tarea" ADD CONSTRAINT "FK_324d4fccc1970303f5a5cca2ae8" FOREIGN KEY ("fk_proyecto") REFERENCES "proyecto"("id_proyecto") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reporte_horas" ADD CONSTRAINT "FK_14908ea62a754218b6a9957c40d" FOREIGN KEY ("fk_tarea") REFERENCES "tarea"("id_tarea") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "reporte_horas" ADD CONSTRAINT "FK_9173124bf78675fbb3432efee91" FOREIGN KEY ("fk_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "comentario_post" ADD CONSTRAINT "FK_a39394d9cebf73c22549b7545fb" FOREIGN KEY ("fk_post") REFERENCES "post"("id_post") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" ADD CONSTRAINT "FK_52c0f51fcac70db5f1ddc175fe9" FOREIGN KEY ("fk_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tajada" ADD CONSTRAINT "FK_5ace3f0a1ff7125bb991072f2bf" FOREIGN KEY ("fk_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "tajada" ADD CONSTRAINT "FK_ef2c94ef08d0aa4c6536bd33206" FOREIGN KEY ("estadoTajadaIdEstadoT") REFERENCES "estado_tajada"("id_estadoT") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario" ADD CONSTRAINT "FK_f1edb52aee4615361999b167dcb" FOREIGN KEY ("fk_rol_usuario") REFERENCES "rol_usuario"("id_rol") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario" ADD CONSTRAINT "FK_206e96f7f1420d422481fc77997" FOREIGN KEY ("fk_pais") REFERENCES "pais"("id_pais") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario" ADD CONSTRAINT "FK_bede8f57cfea4ac5280119ff94d" FOREIGN KEY ("fk_estadoU") REFERENCES "estado_usuario"("id_estadoU") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "franja_horaria" ADD CONSTRAINT "FK_be5c9812be447b3475b97637396" FOREIGN KEY ("fk_usuario") REFERENCES "usuario"("id_usuario") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_tarea" ADD CONSTRAINT "FK_c28e58f377895c6b6f8591532b3" FOREIGN KEY ("fk_id_usuario") REFERENCES "usuario"("id_usuario") ON DELETE CASCADE ON UPDATE CASCADE`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_tarea" ADD CONSTRAINT "FK_62af4f261d265a08e7e63b432ad" FOREIGN KEY ("fk_id_tarea") REFERENCES "tarea"("id_tarea") ON DELETE NO ACTION ON UPDATE NO ACTION`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "usuario_tarea" DROP CONSTRAINT "FK_62af4f261d265a08e7e63b432ad"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario_tarea" DROP CONSTRAINT "FK_c28e58f377895c6b6f8591532b3"`,
    );
    await queryRunner.query(
      `ALTER TABLE "franja_horaria" DROP CONSTRAINT "FK_be5c9812be447b3475b97637396"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario" DROP CONSTRAINT "FK_bede8f57cfea4ac5280119ff94d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario" DROP CONSTRAINT "FK_206e96f7f1420d422481fc77997"`,
    );
    await queryRunner.query(
      `ALTER TABLE "usuario" DROP CONSTRAINT "FK_f1edb52aee4615361999b167dcb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tajada" DROP CONSTRAINT "FK_ef2c94ef08d0aa4c6536bd33206"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tajada" DROP CONSTRAINT "FK_5ace3f0a1ff7125bb991072f2bf"`,
    );
    await queryRunner.query(
      `ALTER TABLE "post" DROP CONSTRAINT "FK_52c0f51fcac70db5f1ddc175fe9"`,
    );
    await queryRunner.query(
      `ALTER TABLE "comentario_post" DROP CONSTRAINT "FK_a39394d9cebf73c22549b7545fb"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reporte_horas" DROP CONSTRAINT "FK_9173124bf78675fbb3432efee91"`,
    );
    await queryRunner.query(
      `ALTER TABLE "reporte_horas" DROP CONSTRAINT "FK_14908ea62a754218b6a9957c40d"`,
    );
    await queryRunner.query(
      `ALTER TABLE "tarea" DROP CONSTRAINT "FK_324d4fccc1970303f5a5cca2ae8"`,
    );
    await queryRunner.query(
      `ALTER TABLE "proyecto" DROP CONSTRAINT "FK_53e3e9f8e0d7940be62ea4643ff"`,
    );
    await queryRunner.query(
      `ALTER TABLE "proyecto" DROP CONSTRAINT "FK_a987995cd0aeb02dedd6a9e6c0f"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_62af4f261d265a08e7e63b432a"`,
    );
    await queryRunner.query(
      `DROP INDEX "public"."IDX_c28e58f377895c6b6f8591532b"`,
    );
    await queryRunner.query(`DROP TABLE "usuario_tarea"`);
    await queryRunner.query(`DROP TABLE "franja_horaria"`);
    await queryRunner.query(`DROP TABLE "usuario"`);
    await queryRunner.query(`DROP TABLE "tajada"`);
    await queryRunner.query(`DROP TABLE "estado_tajada"`);
    await queryRunner.query(`DROP TABLE "post"`);
    await queryRunner.query(`DROP TABLE "comentario_post"`);
    await queryRunner.query(`DROP TABLE "rol_usuario"`);
    await queryRunner.query(`DROP TABLE "estado_usuario"`);
    await queryRunner.query(`DROP TABLE "reporte_horas"`);
    await queryRunner.query(`DROP TABLE "tarea"`);
    await queryRunner.query(`DROP TABLE "proyecto"`);
    await queryRunner.query(`DROP TABLE "pais"`);
    await queryRunner.query(`DROP TABLE "estado_proyecto"`);
  }
}
