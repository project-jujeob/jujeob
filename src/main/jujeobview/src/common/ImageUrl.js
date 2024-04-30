export const getImageUrl = (imgPath) => {
    if (imgPath.includes('http')) {
        return imgPath;
    } else {
        // 로컬 파일 시스템 경로를 웹 URL로 변환
        const newPath = imgPath.replace(/\\/g, '/').replace('src/main/resources/static', '');
        return newPath.startsWith('/') ? newPath : `/${newPath}`;
    }
};