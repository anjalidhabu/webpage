import { person, social } from "@/resources";
import { withBasePath } from "@/utils/paths";
import { IconButton, Row, Text } from "@once-ui-system/core";
import styles from "./Footer.module.scss";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <Row as="footer" fillWidth padding="8" horizontal="center" s={{ direction: "column" }}>
      <Row
        className={styles.mobile}
        maxWidth="m"
        paddingY="8"
        paddingX="16"
        gap="16"
        horizontal="between"
        vertical="center"
        s={{
          direction: "column",
          horizontal: "center",
          vertical: "center",
        }}
      >
        <Text variant="body-default-s" onBackground="neutral-strong">
          <Text onBackground="neutral-weak">© {currentYear} /</Text>
          <Text paddingX="4">{person.name}</Text>
        </Text>
        <div className={styles.footerActions}>
          <Row gap="16">
            {social.map(
              (item) =>
                item.link && (
                  <IconButton
                    key={item.name}
                    href={item.link}
                    icon={item.icon}
                    tooltip={item.name}
                    size="s"
                    variant="ghost"
                  />
                ),
            )}
          </Row>
          <span className={styles.creatorMark} title="Crafted by RA" role="img" aria-label="Website by RBD">
            <img src={withBasePath("/images/projects/research_themes/RBD.png")} alt="" />
          </span>
        </div>
      </Row>
      <Row height="80" hide s={{ hide: false }} />
    </Row>
  );
};
