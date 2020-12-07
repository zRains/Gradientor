
function Copy(text: string) {
    let window_: any = window
    let clipboardData: any
    if (window_.clipboardData && window_.clipboardData.setData) {
        return clipboardData.setData("Text", text);
    }
    else if (document.queryCommandSupported && document.queryCommandSupported("copy")) {
        var textarea = document.createElement("textarea");
        textarea.textContent = text;
        // 防止在Microsoft Edge自动滚动到浏览器底部
        textarea.style.position = "fixed";
        document.body.appendChild(textarea);
        textarea.select();
        try {
            // IE低版本会弹出安全警告框
            return document.execCommand("copy");
        }
        catch (error) {
            console.warn("Copy to clipboard failed.", error);
            return false;
        }
        finally {
            document.body.removeChild(textarea);
        }
    }
}

export default Copy