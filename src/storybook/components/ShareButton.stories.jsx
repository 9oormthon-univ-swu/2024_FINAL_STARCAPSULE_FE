import ShareButton from '@/components/ShareButton';

const meta = {
    title: 'components/ShareButton',
    component: ShareButton,
    tags: ['autodocs'],
    argTypes: {
        title: { control: 'text', description: '공유할 제목' },
        url: { control: 'text', description: '공유할 URL' },
        text: { control: 'text', description: '공유할 내용' },
    },
};

// 기본 스토리 설정
const Default = {
    args: {
        title: '미르미님의 스노로그에 추억을 남겨주세요!',
        url: 'https://www.google.com',
        text: '미르미님의 스노로그에 추억을 남겨주세요!',
    },
};

export default meta;
export { Default };
