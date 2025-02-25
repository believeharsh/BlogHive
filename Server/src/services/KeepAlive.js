import fetch from 'node-fetch';

const keepAlive = (url) => {
    setInterval(async () => {
        try {
            await fetch(url);
            console.log('Keep-alive ping sent');
        } catch (err) {
            console.log('Keep-alive ping failed');
        }
    }, 840000); // 14 minutes (Render's timeout is 15 minutes)
};

export { keepAlive };