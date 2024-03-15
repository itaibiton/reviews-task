import imgGen from "@dudadev/random-img";


export const getRandomImage = async () => {
    const img = imgGen().then((url: string) => {
        return url;
    });

    return img;
};