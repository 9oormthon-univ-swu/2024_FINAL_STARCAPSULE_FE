import Layout from '@/layouts/Layout';

const meta = {
    title: 'layouts/Layout',
    component: Layout,
    tags: ['autodocs'],
    argTypes: {
        sx: { control: 'object', description: 'sx prop' },
        snow: { control: 'boolean', description: 'snow prop' },
    },
};

const Snow = {
    args: {
        sx: { overflow: 'hidden' },
        snow: true,
    },
};

const NoSnow = {
    args: {
        sx: { overflow: 'hidden' },
        snow: false,
    },
};

export default meta;
export { Snow, NoSnow };
