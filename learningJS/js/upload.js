// 文件的展示
function previewFiles() {
    var time = new Date().Format("yyyy-MM-dd hh:mm")
    var files=document.getElementById("_files").value;
    var filelist=document.getElementById("files");
    var fileName=getFileName(files);
    var lis=document.createElement("li");
    filelist.appendChild(lis);
    lis.innerHTML=fileName+"<span>" + time + "</span>";
 }

//下面用于多图片上传预览功能
    function setImagePreviews() {
        var MAXWIDTH = 130;
        var MAXHEIGHT = 100;
        var docObj = document.getElementById("_pictures");
        var dd = document.getElementById("pictures");
        dd.innerHTML = "";
        var fileList = docObj.files;
        for (var i = 0; i < fileList.length; i++) {

            dd.innerHTML += "<div style='float:left' > <img id='img" + i + "' /> </div>";
            var imgObjPreview = document.getElementById("img" + i);
            if (docObj.files && docObj.files[i]) {
                //火狐下，直接设img属性
                imgObjPreview.style.display = 'block';
                imgObjPreview.style.width = '130px';
                imgObjPreview.style.height = '100px';
                imgObjPreview.style.marginLeft = '10px';
                //imgObjPreview.src = docObj.files[0].getAsDataURL();
                //火狐7以上版本不能用上面的getAsDataURL()方式获取，需要一下方式
                imgObjPreview.src = window.URL.createObjectURL(docObj.files[i]);
            } else {
                //IE下，使用滤镜
                docObj.select();
                var imgSrc = document.selection.createRange().text;
                alert(imgSrc);
                var localImagId = document.getElementById("img" + i);
                //必须设置初始大小
                localImagId.style.marginLeft = '10px';
                //图片异常的捕捉，防止用户修改后缀来伪造图片
                try {
                    localImagId.style.filter = "progid:DXImageTransform.Microsoft.AlphaImageLoader(sizingMethod=scale)";
                    localImagId.filters.item("DXImageTransform.Microsoft.AlphaImageLoader").src = imgSrc;
                    
                    // 改变图片大小
                    var rect = clacImgZoomParam(MAXWIDTH, MAXHEIGHT, img.offsetWidth, img.offsetHeight);
                    status = ('rect:' + rect.top + ',' + rect.left + ',' + rect.width + ',' + rect.height);
                    div.innerHTML += "<div id=divhead style='width:" + rect.width + "px;height:" + rect.height + "px;margin-top:" + rect.top + "px;" + sFilter + src + "\"'></div>";
                } catch (e) {
                    alert("您上传的图片格式不正确，请重新选择!");
                    return false;
                }
                imgObjPreview.style.display = 'none';
                document.selection.empty();
            }
        }

        return true;
    }

    function clacImgZoomParam(maxWidth, maxHeight, width, height) {
        var param = {
            top: 0,
            left: 0,
            width: width,
            height: height
        };
        if (width > maxWidth || height > maxHeight) {
            rateWidth = width / maxWidth;
            rateHeight = height / maxHeight;

            if (rateWidth > rateHeight) {
                param.width = maxWidth;
                param.height = Math.round(height / rateWidth);
            } else {
                param.width = Math.round(width / rateHeight);
                param.height = maxHeight;
            }
        }

        param.left = Math.round((maxWidth - param.width) / 2);
        param.top = Math.round((maxHeight - param.height) / 2);
        return param;
    }

 // 文件名的获取
 function getFileName(o) {
     var pos = o.lastIndexOf("\\");
     return o.substring(pos + 1);
 }

// 时间获取
 Date.prototype.Format = function (fmt) { //author: meizz 
    var o = {
        "M+": this.getMonth() + 1, //月份 
        "d+": this.getDate(), //日 
        "h+": this.getHours(), //小时 
        "m+": this.getMinutes(), //分 
        "s+": this.getSeconds(), //秒 
        "q+": Math.floor((this.getMonth() + 3) / 3), //季度 
        "S": this.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
