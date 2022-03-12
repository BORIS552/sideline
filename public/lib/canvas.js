/**
 * Canvas section management of image editor
 */
(function () {
  'use strict';
  var canvas = function () {
    try {
      $(`${this.containerSelector} .main-panel`).append(`<div class="canvas-holder" id="canvas-holder"><div class="content"><canvas id="c"></canvas></div></div>`);
      const fabricCanvas = new fabric.Canvas('c').setDimensions({
        width: 1200,
        height: 900
      })


      var jsonTemplate_One = '{"objects":[{"type":"rect","version":"3.6.3","originX":"center","originY":"center","left":273,"top":159,"width":150,"height":150,"fill":"#29477F","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":{"color":"rgba(94, 128, 191, 0.5)","blur":5,"offsetX":10,"offsetY":10,"affectStroke":false,"nonScaling":false},"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"circle","version":"3.6.3","originX":"center","originY":"center","left":121,"top":320,"width":200,"height":200,"fill":"rgb(166,111,213)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":{"color":"#5b238A","blur":20,"offsetX":-20,"offsetY":-10,"affectStroke":false,"nonScaling":false},"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"radius":100,"startAngle":0,"endAngle":6.283185307179586},{"type":"textbox","version":"3.6.3","originX":"left","originY":"top","left":140.7,"top":481,"width":161.99,"height":43.93,"fill":"white","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":2.27,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Your text goes here...","fontSize":18,"fontWeight":"normal","fontFamily":"Open Sans, sans-serif","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"minWidth":20,"splitByGrapheme":false,"styles":{}}],"background":"#000"}';
      var jsonTemplate_Two = '{"objects":[{"type":"rect","version":"3.6.3","originX":"center","originY":"center","left":273,"top":159,"width":150,"height":150,"fill":"#29477F","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":{"color":"rgba(94, 128, 191, 0.5)","blur":5,"offsetX":10,"offsetY":10,"affectStroke":false,"nonScaling":false},"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"circle","version":"3.6.3","originX":"center","originY":"center","left":121,"top":320,"width":200,"height":200,"fill":"rgb(166,111,213)","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":10,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":{"color":"#5b238A","blur":20,"offsetX":-20,"offsetY":-10,"affectStroke":false,"nonScaling":false},"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"radius":100,"startAngle":0,"endAngle":6.283185307179586},{"type":"textbox","version":"3.6.3","originX":"left","originY":"top","left":140.7,"top":481,"width":161.99,"height":43.93,"fill":"white","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeMiterLimit":4,"scaleX":1,"scaleY":2.27,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"clipTo":null,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","transformMatrix":null,"skewX":0,"skewY":0,"text":"Your text goes here...","fontSize":18,"fontWeight":"normal","fontFamily":"Open Sans, sans-serif","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"minWidth":20,"splitByGrapheme":false,"styles":{}}],"background":"#FFF"}'
      var jsonTemplate_Three = ''
     

      fabricCanvas.originalW = fabricCanvas.width;
      fabricCanvas.originalH = fabricCanvas.height;

      // set up selection style
      fabric.Object.prototype.transparentCorners = false;
      fabric.Object.prototype.cornerStyle = 'circle';
      fabric.Object.prototype.borderColor = '#C00000';
      fabric.Object.prototype.cornerColor = '#C00000';
      fabric.Object.prototype.cornerStrokeColor = '#FFF';
      fabric.Object.prototype.padding = 0;

      // retrieve active selection to react state
      fabricCanvas.on('selection:created', (e) => this.setActiveSelection(e.target))
      fabricCanvas.on('selection:updated', (e) => this.setActiveSelection(e.target))
      fabricCanvas.on('selection:cleared', (e) => this.setActiveSelection(null))

      // snap to an angle on rotate if shift key is down
      fabricCanvas.on('object:rotating', (e) => {
        if (e.e.shiftKey) {
          e.target.snapAngle = 15;
        } else {
          e.target.snapAngle = false;
        }
      })

      fabricCanvas.on('object:modified', () => {
        console.log('trigger: modified')
        let currentState = this.canvas.toJSON();
        this.history.push(JSON.stringify(currentState));
      })

      const savedCanvas = saveInBrowser.load('canvasEditor');
      if (localStorage.getItem("selected_template")) {
        console.log("data from file");

        var selected_tempalte = localStorage.getItem("selected_template");
        if(selected_tempalte === '1')
        {
          var template_one = JSON.parse(template_1);
        }
        if(selected_tempalte === '2')
        {
          var template_one = JSON.parse(template_3);
        }
        if(selected_tempalte === '3')
        {
          var template_one = JSON.parse(template_4);
        }
        // if(selected_tempalte === '4')
        // {
        //   var template_one = JSON.parse(template_6);
        // }
        
        
        
        console.log(JSON.stringify(template_one));
        var tem_value = JSON.stringify(template_one);
        fabricCanvas.loadFromJSON(tem_value, fabricCanvas.renderAll.bind(fabricCanvas));
      }else {
        console.log("data from file");
        var template_one = JSON.parse(template_1);
        console.log(JSON.stringify(template_one));
        var tem_value = JSON.stringify(template_one);
        fabricCanvas.loadFromJSON(tem_value, fabricCanvas.renderAll.bind(fabricCanvas));
      }

      // move objects with arrow keys
      (() => document.addEventListener('keydown', (e) => {
        const key = e.which || e.keyCode;
        let activeObject;

        if (document.querySelectorAll('textarea:focus, input:focus').length > 0) return;

        if (key === 37 || key === 38 || key === 39 || key === 40) {
          e.preventDefault();
          activeObject = fabricCanvas.getActiveObject();
          if (!activeObject) {
            return;
          }
        }

        if (key === 37) {
          activeObject.left -= 1;
        } else if (key === 39) {
          activeObject.left += 1;
        } else if (key === 38) {
          activeObject.top -= 1;
        } else if (key === 40) {
          activeObject.top += 1;
        }

        if (key === 37 || key === 38 || key === 39 || key === 40) {
          activeObject.setCoords();
          fabricCanvas.renderAll();
          fabricCanvas.trigger('object:modified');
        }
      }))();

      // delete object on del key
      (() => {
        document.addEventListener('keydown', (e) => {
          const key = e.which || e.keyCode;
          if (
            key === 46 &&
            document.querySelectorAll('textarea:focus, input:focus').length === 0
          ) {

            fabricCanvas.getActiveObjects().forEach(obj => {
              fabricCanvas.remove(obj);
            });

            fabricCanvas.discardActiveObject().requestRenderAll();
            fabricCanvas.trigger('object:modified')
          }
        })
      })();

      setTimeout(() => {
        let currentState = fabricCanvas.toJSON();
        this.history.push(JSON.stringify(currentState));
      }, 1000);

      return fabricCanvas;
    } catch (_) {
      console.error("can't create canvas instance");
      return null;
    }
  }

  window.ImageEditor.prototype.initializeCanvas = canvas;
})();