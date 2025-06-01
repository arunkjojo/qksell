import { ArrowLeft } from 'lucide-react';

interface PageHeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
  extraClass?: string;
}

export const PageHeader: React.FC<PageHeaderProps> = ({
  title,
  showBack = true,
  onBack,
  extraClass = ''
}) => {
  return (
    <div className={`flex items-center justify-between mb-8 ${extraClass}`}>
      {showBack ? (
        <button
          onClick={onBack}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
          aria-label="Go back"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>
      ) : (
        null
      )}
      <h1 className="text-2xl font-bold text-center flex-grow">{title}</h1>
    </div>
  );
};