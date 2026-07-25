import Link from "next/link";
import { clientConfig } from "@/config/client";
import SocialIcons from "./SocialIcons";
import styles from "./Footer.module.css";

export default function Footer() {
  const { companyName, contacts } = clientConfig;

  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <span className={styles.logo}>{companyName}</span>

        <div className={styles.links}>
          <a
            href={`tel:${contacts.phone.replace(/[^\d+]/g, "")}`}
            className={styles.phoneLink}
          >
            {contacts.phone}
          </a>
          <span className={styles.city}>{contacts.city}</span>
        </div>

        <SocialIcons />

        <div className={styles.bottom}>
          <span className={styles.copy}>
            © {new Date().getFullYear()} {companyName}
          </span>
          <Link href="/privacy" className={styles.privacy}>
            Политика конфиденциальности
          </Link>
        </div>
      </div>
    </footer>
  );
}
