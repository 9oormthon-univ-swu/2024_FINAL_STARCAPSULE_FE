import MainTitle from '@/page/main/panel/MainTitle';

const meta = {
    title: 'main/MainTitle',
    component: MainTitle,
    tags: ['autodocs'],
    argTypes: {
        nickname: { control: 'text', description: '닉네임' },
    },
};

// 기본 스토리 설정
const Default = {
    args: {
        nickname: '미르미',
    },
};

const Nickname6Letters = {
    args: {
        nickname: '미르미미르미',
    },
};

export default meta;
export { Default, Nickname6Letters };
