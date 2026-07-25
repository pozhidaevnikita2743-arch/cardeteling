import { clientConfig } from "@/config/client";
import styles from "./SocialIcons.module.css";

type SocialKey = "telegram" | "whatsapp" | "instagram" | "vk";

const ICONS: Record<SocialKey, React.ReactNode> = {
  telegram: (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M22 2 11 13" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
      <path
        d="M22 2 15 22l-4-9-9-4 20-7z"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="none">
      <path
        d="M12 21a9 9 0 1 0-9-9c0 1.6.4 3.1 1.2 4.4L3 21l4.8-1.2A9 9 0 0 0 12 21z"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M8.7 8.3c.2-.5.4-.5.7-.5h.5c.2 0 .4 0 .6.4l.7 1.6c.1.2 0 .4-.1.6l-.5.6c-.1.2-.1.3 0 .5.4.7 1.4 1.7 2.1 2.1.2.1.3.1.5 0l.6-.5c.2-.1.4-.2.6-.1l1.6.7c.4.2.4.4.4.6v.5c0 .3 0 .5-.5.7-.9.4-2.2.2-3.9-1-1.4-1-2.4-2.2-3-3.5-.5-1.1-.4-2 0-2.7z"
        strokeWidth="1.1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="none">
      <rect x="3" y="3" width="18" height="18" rx="5" strokeWidth="1.6" />
      <circle cx="12" cy="12" r="4" strokeWidth="1.6" />
      <circle cx="17.2" cy="6.8" r="1" fill="currentColor" stroke="none" />
    </svg>
  ),
  vk: <span className={styles.vkText}>VK</span>,
};

const LABELS: Record<SocialKey, string> = {
  telegram: "Telegram",
  whatsapp: "WhatsApp",
  instagram: "Instagram",
  vk: "ВКонтакте",
};

export default function SocialIcons() {
  const { contacts } = clientConfig;
  const keys = (["telegram", "whatsapp", "instagram", "vk"] as SocialKey[]).filter(
    (key) => contacts[key]
  );

  if (keys.length === 0) return null;

  return (
    <ul className={styles.wrapper}>
      {keys.map((key) => (
        <li key={key}>
          <a
            href={contacts[key]}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.icon}
            aria-label={LABELS[key]}
          >
            {ICONS[key]}
          </a>
        </li>
      ))}
    </ul>
  );
}
