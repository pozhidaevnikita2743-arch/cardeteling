import type { Metadata } from "next";
import Link from "next/link";
import { clientConfig } from "@/config/client";
import Footer from "@/components/Footer/Footer";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: `Политика конфиденциальности — ${clientConfig.companyName}`,
};

export default function PrivacyPage() {
  const { companyName } = clientConfig;

  return (
    <>
      <section className={styles.section}>
        <div className="container">
          <Link href="/" className={styles.back}>
            ← На главную
          </Link>

          <h1 className={styles.heading}>Политика конфиденциальности</h1>

          <div className={styles.body}>
            <p>
              Настоящая политика описывает, как {companyName} собирает, использует и
              защищает персональные данные, которые вы оставляете через формы на
              сайте (запись на диагностику, обратная связь).
            </p>

            <h2>Какие данные собираются</h2>
            <p>Имя, номер телефона и выбранная услуга — только то, что вы указываете в форме записи.</p>

            <h2>Как используются данные</h2>
            <p>
              Данные используются исключительно для связи с вами по вопросу записи
              и оказания услуг детейлинг-студии. Мы не передаём их третьим лицам.
            </p>

            <h2>Хранение и защита</h2>
            <p>
              Данные хранятся не дольше, чем это необходимо для обработки заявки, и
              защищены от несанкционированного доступа.
            </p>

            <h2>Ваши права</h2>
            <p>
              Вы можете запросить удаление своих данных, написав нам через любой из
              контактов, указанных в футере сайта.
            </p>

            <p className={styles.note}>
              Это шаблонный текст — перед запуском сайта замените его на
              актуальную политику конфиденциальности студии.
            </p>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
