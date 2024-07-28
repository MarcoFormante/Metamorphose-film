<?php

declare(strict_types=1);

namespace DoctrineMigrations;

use Doctrine\DBAL\Schema\Schema;
use Doctrine\Migrations\AbstractMigration;

/**
 * Auto-generated Migration: Please modify to your needs!
 */
final class Version20240720143229 extends AbstractMigration
{
    public function getDescription(): string
    {
        return '';
    }

    public function up(Schema $schema): void
    {
        // this up() migration is auto-generated, please modify it to your needs
        $this->addSql('CREATE TABLE gallery_images (id INT AUTO_INCREMENT NOT NULL, src VARCHAR(255) NOT NULL, gallery_name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project (id INT AUTO_INCREMENT NOT NULL, name VARCHAR(255) NOT NULL, youtube_video VARCHAR(255) NOT NULL, background_video VARCHAR(255) NOT NULL, collab_with VARCHAR(255) DEFAULT NULL, is_active TINYINT(1) NOT NULL, abr_name VARCHAR(255) NOT NULL, PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project_images (id INT AUTO_INCREMENT NOT NULL, project_id_id INT NOT NULL, src VARCHAR(255) NOT NULL, INDEX IDX_F7BB55206C1197C9 (project_id_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE project_staff (id INT AUTO_INCREMENT NOT NULL, project_id INT DEFAULT NULL, production VARCHAR(255) NOT NULL, made_by VARCHAR(255) NOT NULL, artists VARCHAR(255) DEFAULT NULL, montage VARCHAR(255) NOT NULL, cadrage VARCHAR(255) NOT NULL, droniste VARCHAR(255) DEFAULT NULL, ph_plateau VARCHAR(255) DEFAULT NULL, decorateurs VARCHAR(255) DEFAULT NULL, UNIQUE INDEX UNIQ_513BFA0C166D1F9C (project_id), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('CREATE TABLE user (id INT AUTO_INCREMENT NOT NULL, username VARCHAR(180) NOT NULL, roles JSON NOT NULL COMMENT \'(DC2Type:json)\', password VARCHAR(255) NOT NULL, UNIQUE INDEX UNIQ_IDENTIFIER_USERNAME (username), PRIMARY KEY(id)) DEFAULT CHARACTER SET utf8mb4 COLLATE `utf8mb4_unicode_ci` ENGINE = InnoDB');
        $this->addSql('ALTER TABLE project_images ADD CONSTRAINT FK_F7BB55206C1197C9 FOREIGN KEY (project_id_id) REFERENCES project (id)');
        $this->addSql('ALTER TABLE project_staff ADD CONSTRAINT FK_513BFA0C166D1F9C FOREIGN KEY (project_id) REFERENCES project (id)');
    }

    public function down(Schema $schema): void
    {
        // this down() migration is auto-generated, please modify it to your needs
        $this->addSql('ALTER TABLE project_images DROP FOREIGN KEY FK_F7BB55206C1197C9');
        $this->addSql('ALTER TABLE project_staff DROP FOREIGN KEY FK_513BFA0C166D1F9C');
        $this->addSql('DROP TABLE gallery_images');
        $this->addSql('DROP TABLE project');
        $this->addSql('DROP TABLE project_images');
        $this->addSql('DROP TABLE project_staff');
        $this->addSql('DROP TABLE user');
    }
}
