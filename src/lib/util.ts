export default {
    miniBase64: (base64: string, callback: any) => {
        let canvas: any = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        // 创建img对象
        const img = new Image();
        img.src = base64;
        img.onload = () => {
            const width = img.width;
            const height = img.height;
            // 按比例压缩
            const rate = (width < height ? width / height : height / width) / 3;
            canvas.width = width * rate;
            canvas.height = height * rate;
            // 绘制图片
            ctx.drawImage(
                img,
                0,
                0,
                width,
                height,
                0,
                0,
                width * rate,
                height * rate,
            );
            // 压缩
            const dataURL = canvas.toDataURL(base64 || 'image/png');
            // 清除画布
            callback(dataURL);
            canvas = null;
        };
    },
};
