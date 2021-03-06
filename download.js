// 用来识别 Blob 的 Mime Type
var MimeExtension = { };
MimeExtension["audio/aac"] = ".aac";
MimeExtension["application/x-abiword"] = ".abw";
MimeExtension["application/x-freearc"] = ".arc";
MimeExtension["video/x-msvideo"] = ".avi";
MimeExtension["application/vnd.amazon.ebook"] = ".azw";
MimeExtension["application/octet-stream"] = ".bin";
MimeExtension["image/bmp"] = ".bmp";
MimeExtension["application/x-bzip"] = ".bz";
MimeExtension["application/x-bzip2"] = ".bz2";
MimeExtension["application/x-csh"] = ".csh";
MimeExtension["text/css"] = ".css";
MimeExtension["text/csv"] = ".csv";
MimeExtension["application/msword"] = ".doc";
MimeExtension["application/vnd.openxmlformats-officedocument.wordprocessingml.document"] = ".docx";
MimeExtension["application/vnd.ms-fontobject"] = ".eot";
MimeExtension["application/epub+zip"] = ".epub";
MimeExtension["application/gzip"] = ".gz";
MimeExtension["image/gif"] = ".gif";
MimeExtension["text/html"] = ".html";
MimeExtension["image/vnd.microsoft.icon"] = ".ico";
MimeExtension["text/calendar"] = ".ics";
MimeExtension["application/java-archive"] = ".jar";
MimeExtension["image/jpeg"] = ".jpg";
MimeExtension["text/javascript"] = ".js";
MimeExtension["application/json"] = ".json";
MimeExtension["application/ld+json"] = ".jsonld";
MimeExtension["audio/midi"] = ".midi";
MimeExtension["audio/x-midi"] = ".midi";
MimeExtension["audio/mpeg"] = ".mp3";
MimeExtension["video/mpeg"] = ".mpeg";
MimeExtension["application/vnd.apple.installer+xml"] = ".mpkg";
MimeExtension["application/vnd.oasis.opendocument.presentation"] = ".odp";
MimeExtension["application/vnd.oasis.opendocument.spreadsheet"] = ".ods";
MimeExtension["application/vnd.oasis.opendocument.text"] = ".odt";
MimeExtension["audio/ogg"] = ".oga";
MimeExtension["video/ogg"] = ".ogv";
MimeExtension["application/ogg"] = ".ogx";
MimeExtension["audio/opus"] = ".opus";
MimeExtension["font/otf"] = ".otf";
MimeExtension["image/png"] = ".png";
MimeExtension["application/pdf"] = ".pdf";
MimeExtension["application/x-httpd-php"] = ".php";
MimeExtension["application/vnd.ms-powerpoint"] = ".ppt";
MimeExtension["application/vnd.openxmlformats-officedocument.presentationml.presentation"] = ".pptx";
MimeExtension["application/vnd.rar"] = ".rar";
MimeExtension["application/rtf"] = ".rtf";
MimeExtension["application/x-sh"] = ".sh";
MimeExtension["image/svg+xml"] = ".svg";
MimeExtension["application/x-shockwave-flash"] = ".swf";
MimeExtension["application/x-tar"] = ".tar";
MimeExtension["image/tiff"] = ".tiff";
MimeExtension["video/mp2t"] = ".ts";
MimeExtension["font/ttf"] = ".ttf";
MimeExtension["text/plain"] = ".txt";
MimeExtension["application/vnd.visio"] = ".vsd";
MimeExtension["audio/wav"] = ".wav";
MimeExtension["audio/webm"] = ".weba";
MimeExtension["video/webm"] = ".webm";
MimeExtension["image/webp"] = ".webp";
MimeExtension["font/woff"] = ".woff";
MimeExtension["font/woff2"] = ".woff2";
MimeExtension["application/xhtml+xml"] = ".xhtml";
MimeExtension["application/vnd.ms-excel"] = ".xls";
MimeExtension["application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"] = ".xlsx";
MimeExtension["application/xml "] = ".xml";
MimeExtension["text/xml"] = ".xml";
MimeExtension["application/vnd.mozilla.xul+xml"] = ".xul";
MimeExtension["application/zip"] = ".zip";
MimeExtension["video/3gpp"] = ".3gp";
MimeExtension["audio/3gpp"] = ".3gp";
MimeExtension["video/3gpp2"] = ".3g2";
MimeExtension["audio/3gpp2"] = ".3g2";
MimeExtension["application/x-7z-compressed"] = ".7z";

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// 用 fetch 获取资源， a 标签的click() 触发下载
// 不输入文件名，使用默认文件名
async function downloadFile(urlString, fileName) {
    const response = await fetch(urlString);
    const link = document.createElement('a');
    const blob = await response.blob();
    link.href = URL.createObjectURL(blob);
    // 自动识别文件后缀
    if (fileName)
        link.download = fileName + MimeExtension[blob.type];
    else {
        let extension = urlString.split('.').pop();
        let fullFileName = urlString.split('/').pop();
        if (extension.includes(fullFileName)) // 没有后缀名
            link.download = decodeURI(fullFileName) + MimeExtension[blob.type];
        else
            link.download = decodeURI(fullFileName);
    }
    link.click();
    console.log(fileName, urlString, "StartDownload");
    URL.revokeObjectURL(link.href);
    link.remove();
}
