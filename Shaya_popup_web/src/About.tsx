import { useInView } from 'react-intersection-observer';
function Aboutpg() {
    const { ref, inView } = useInView({ triggerOnce: true, threshold: 0.5 });
  
    return (
      <div
        ref={ref}
        className={`about-text ${inView ? 'highlighted' : ''}`}
      >
        This text is always visible and highlights on scroll.
      </div>
    );
  }

export default Aboutpg;
