import MainTitle from '@/pages/main/MainTitle';

const meta = {
    title: 'main/MainTitle',
    component: MainTitle,
    tags: ['autodocs'],
    argTypes: {
        nickname: { control: 'text', description: '닉네임' },
        setNickname: { action: 'setNickname', description: '닉네임 설정 함수' },
    },
};

// 기본 스토리 설정
const Default = {
    args: {
        nickname: '미르미',
        setNickname: () => {},
    },
};

const Nickname6Letters = {
    args: {
        nickname: '미르미미르미',
        setNickname: () => {},
    },
};

export default meta;
export { Default, Nickname6Letters };
