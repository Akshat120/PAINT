var color = "rgb(0,0,0)";
var white = "rgb(255,255,255)"
var tool=null;
var cur_tool=null;
var draw=false;
var res_scale = { 0:[50,"cell1"], 33:[25,"cell2"], 66:[5,"cell3"] }
var size=10;
var brush_size="small";

function set_resolution(){
    //init variables
    var val=$("#range").val();
    var width = res_scale[val][0];
    size = 500/width;
    var w = (width).toString() +"px";
    var num_cells = ( 250000 ) / ( width*width );

    // remove cells
    $(".container").empty();

    // add cells 
    for(let x = 0; x < num_cells; x++) {
        var cell = document.createElement('div');
        $(cell).addClass("cell");
        $(cell).addClass(res_scale[val][1]);
        $(".container").append(cell);
    }

}
function myFunction() {
    document.getElementById("fontColorButton").click(); 
  }
$(".brush").mousedown(function(){
    tool="brush";
    if(cur_tool!=null)cur_tool.removeClass("tool-effect-selected");
    console.log($("#fontColorButton").val());
    color=$("#fontColorButton").val();
    cur_tool=$(this);
    cur_tool.addClass("tool-effect-selected");
})
$(".eraser").mousedown(function(){
    tool="eraser";
    if(cur_tool!=null)cur_tool.removeClass("tool-effect-selected");
    cur_tool=$(this);
    cur_tool.addClass("tool-effect-selected");
})
$(".color").mousedown(function(){
    tool="color";
    if(cur_tool!=null)cur_tool.removeClass("tool-effect-selected");
    cur_tool=$(this);
    cur_tool.addClass("tool-effect-selected");
})
$(".size1").mousedown(function(){
    brush_size="small";
    if(cur_tool!=null)cur_tool.removeClass("tool-effect-selected");
    cur_tool=$(this);
    cur_tool.addClass("tool-effect-selected");
})
$(".size2").mousedown(function(){
    brush_size="medium";
    if(cur_tool!=null)cur_tool.removeClass("tool-effect-selected");
    cur_tool=$(this);
    cur_tool.addClass("tool-effect-selected");
})
$(".size3").mousedown(function(){
    brush_size="large";
    if(cur_tool!=null)cur_tool.removeClass("tool-effect-selected");
    cur_tool=$(this);
    cur_tool.addClass("tool-effect-selected");
});
$(".size4").mousedown(function(){
    brush_size="extra_large";
    if(cur_tool!=null)cur_tool.removeClass("tool-effect-selected");
    cur_tool=$(this);
    cur_tool.addClass("tool-effect-selected");
});
$(".fill").mousedown(function(){
    tool="fill";
    if(cur_tool!=null) cur_tool.removeClass("tool-effect-selected");
    cur_tool=$(this);
    cur_tool.addClass("tool-effect-selected");
});
$(".container").on('mousedown',function(){
    draw=true;
    //console.log("draw",draw);
})
$(".container").on('mouseup',function(){
    draw=false;
    //console.log("draw",draw);
});
function fill(row,col,drop,color)
{
    if(range(row,col))
    {
        var r=row, c=col;
        var obj = $('.cell').eq(r*size+c);
        var present_color=obj.css("background-color");
        if(present_color==color)
        {
            paint(r,c,drop);
            fill(r-1,c-1,drop,color);
            fill(r-1,c,drop,color);
            fill(r-1,c+1,drop,color);
            fill(r,c+1,drop,color);
            fill(r+1,c+1,drop,color);
            fill(r+1,c,drop,color);
            fill(r+1,c-1,drop,color);
            fill(r,c-1,drop,color);
        }        
    } 
}
$( '#wrapper' ).on( 'mousedown', '.cell', function () {
    color=$("#fontColorButton").val();
    var drop=color
    if(tool=="eraser") drop=white
    //console.log("background-color",$(this).css("background-color"));
    if(tool=="brush")
    {
        if($(this).css("background-color")!=drop)
        {
            var index = $(this).index();
                console.log("index",index);
                var row = Math.floor(index/size);
                var col = Math.floor(index%size);
                console.log(row,col);
                if(brush_size=="small")
                {
                    $(this).css({
                        "background-color":drop
                    });   
                }
                else if(brush_size=="medium")
                {
                    console.log("medium");
                    paint_size2(row,col,drop);
                }
                else if(brush_size=="large")
                {
                    paint_size3(row,col,drop);
                }
                else if(brush_size=="extra_large")
                {
                    paint_size4(row,col,drop);
                }     
        }          
    }
    else if(tool=="fill")
    {
        var index  = $(this).index();
        var row    = Math.floor(index/size);
        var col    = Math.floor(index%size);
        var color  = $(this).css("background-color");
        fill(row,col,drop,color);
    }
});


$( '#wrapper' ).on( 'mouseover', '.cell', function () {
    //console.log("DEBUG")
    color=$("#fontColorButton").val();
    var drop=color
    if(tool=="eraser") drop=white
    //console.log("background-color",$(this).css("background-color"));
    if(draw)
    {
            var index = $(this).index();
            console.log("index",index);
            var row = Math.floor(index/size);
            var col = Math.floor(index%size);
            console.log(row,col);
            if(brush_size=="small")
            {
                $(this).css({
                    "background-color":drop
                });   
            }
            else if(brush_size=="medium")
            {
                console.log("medium");
                paint_size2(row,col,drop);
            }
            else if(brush_size=="large")
            {
                paint_size3(row,col,drop);
            }
            else if(brush_size=="extra_large")
            {
                paint_size4(row,col,drop);
            }          
    }
});

function range(r,c)
{
    return ((r>=0) && (r<size) && (c>=0) && (c<size));
}
function paint(r,c,drop)
{
    if(range(r,c))
    {
        var obj=$(".cell").eq(r*size+c);
        obj.css({
            "background-color":drop
        });          
    }
}
function paint_size2(r,c,drop)
{

    var cells = $('.cell');
    paint(r,c,drop);
    paint(r,c+1,drop);
    paint(r+1,c+1,drop);
    paint(r+1,c,drop);
}

function paint_size3(r,c,drop)
{
    var cells = $('.cell');
    paint(r,c,drop);
    paint(r,c+1,drop);
    paint(r+1,c+1,drop);
    paint(r+1,c,drop);

    paint(r-1,c,drop);
    paint(r-1,c+1,drop);
    paint(r,c-1,drop);
    paint(r+1,c-1,drop);
    paint(r,c+2,drop);
    paint(r+1,c+2,drop);
    paint(r+2,c,drop);
    paint(r+2,c+1,drop);
}
function paint_size4(r,c,drop)
{
    var cells = $('.cell');
    paint(r,c,drop);
    paint(r,c+1,drop);
    paint(r+1,c+1,drop);
    paint(r+1,c,drop);

    paint(r-1,c,drop);
    paint(r-1,c+1,drop);
    paint(r,c-1,drop);
    paint(r+1,c-1,drop);
    paint(r,c+2,drop);
    paint(r+1,c+2,drop);
    paint(r+2,c,drop);
    paint(r+2,c+1,drop);

    paint(r-1,c-1,drop);
    paint(r-1,c+2,drop);
    paint(r+2,c-1,drop);
    paint(r+2,c+2,drop);
}

