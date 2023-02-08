const { handlePost } = require('../src/utils/handlePost.ts')
const { downloadImg } = require('../src/utils/downloadImg.ts')

const handleTask = async () => {
    try {
        await downloadImg();
        await handlePost();
    }
    catch (e) { console.log(e) }
};

handleTask()

const letsGo = async () => {
    setInterval(handleTask, 24 * 60 * 60 * 1000)
};

letsGo();