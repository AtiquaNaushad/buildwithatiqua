import { useEffect, useRef, useState } from "react";

// Renders children only once the wrapper is within 300px of the viewport.
export default function LazySection({ id, children }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return setVisible(true);
    const io = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { setVisible(true); io.disconnect(); } },
      { rootMargin: "300px 0px" }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return <div id={id} ref={ref}>{visible ? children : <div className="ph" />}</div>;
}
