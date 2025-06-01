import * as Icons from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export const getLucideIcon = (iconName: string): LucideIcon | null => {
    const IconComponent = Icons[iconName as keyof typeof Icons];
    return typeof IconComponent === 'function' && '$$typeof' in IconComponent ? IconComponent as LucideIcon : null;
};