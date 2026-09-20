import styles from './MediaPlaceholder.module.css';

type Props = {
  label: string;
  aspectRatio?: string;
  caption?: string;
  visualType?: 'hero' | 'portrait' | 'gallery' | 'process' | 'map' | 'object';
  className?: string;
};

export function MediaPlaceholder({ label, aspectRatio = '4 / 5', caption, visualType = 'object', className = '' }: Props) {
  return (
    <figure className={`${styles.frame} ${styles[visualType]} ${className}`} style={{ aspectRatio }}>
      <div className={styles.grid} aria-hidden="true" />
      <div className={styles.orbit} aria-hidden="true" />
      <span className={styles.mark} aria-hidden="true">PKV / MEDIA</span>
      <figcaption>
        <strong>{label}</strong>
        {caption && <small>{caption}</small>}
      </figcaption>
    </figure>
  );
}
