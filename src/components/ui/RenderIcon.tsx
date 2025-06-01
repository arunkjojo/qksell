import { iconComponents } from '@common/constants';
import * as Icons from 'lucide-react';

const RenderIcon = (
    iconName: string = '',
    props: Icons.LucideProps = {}
): JSX.Element => {
    const IconComponent = iconComponents[iconName as keyof typeof iconComponents];
    if (IconComponent) {
        return <IconComponent size={24} className="text-blue-600"  {...props } />;
    } else {
        return <span className="text-xl font-semibold text-blue-600" > {iconName} </span>;
    }
};
export default RenderIcon