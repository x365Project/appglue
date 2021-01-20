export class HTMLUtilities {
    static getGeometry(id: string) : { top: number, left: number, height: number, width: number } | undefined {

        let el = document.getElementById(id);

        if (!el)
            return;

        let width = el.offsetWidth;
        let height = el.offsetHeight;
        let top = el.offsetTop ;
        let left = el.offsetLeft ;

        // var _x = 0;
        // var _y = 0;
        // while( el && !isNaN( el.offsetLeft ) && !isNaN( el.offsetTop ) ) {
        //     _x += el.offsetLeft - el.scrollLeft;
        //     _y += el.offsetTop - el.scrollTop;
        //     el = el.offsetParent as HTMLElement;
        // }

//       return { top: _y, left: _x , height: height, width: width};
        return { top: top, left: left , height: height, width: width};

    }
}
