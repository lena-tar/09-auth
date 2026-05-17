import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className={css.content}>
        <p>© {new Date().getFullYear()} NoteHub. All rights reserved.</p>
        <div className={css.wrap}>
          <p>Developer: Olena Taranova</p>
          <p>
            Contact us:
            <a href="mailto:taranova9933@gmail.com">taranova9933@gmail.com</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
