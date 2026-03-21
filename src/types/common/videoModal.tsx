export interface VideoModalProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  isOpen: boolean;
  onClose: () => void;
  videoSrc: string;
  className?: string;
  overlayClassName?: string;
  containerClassName?: string;
}
