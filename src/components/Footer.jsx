export default function Footer() {
  return (
    <footer>
      <p className="foot-main">Building digital experiences with <span aria-hidden="true">&hearts;</span></p>
      <p className="foot-sub">&copy; {new Date().getFullYear()} Atiqua Naushad &middot; Freelance Developer &middot; All rights reserved</p>
    </footer>
  );
}