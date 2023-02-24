const { handlePost } = require('../src/utils/handlePost.ts')
const { downloadImg } = require('../src/utils/downloadImg.ts')

const handleTask = async () => {
    try {
        const data = await downloadImg();
        await handlePost(data);
    }
    catch (e) { console.log(e) }
};

const letsGo = async () => {
    setInterval(handleTask, 24 * 60 * 60 * 1000)
};

letsGo();