import {DecorateContext, Decorator, IModelConnection, Marker,ScreenViewport} from "@bentley/imodeljs-frontend" ;

export class myCustomDecorator implements Decorator{
   
    private _iModel: IModelConnection;
    private _markers: Marker[];

    constructor(vp : ScreenViewport){
        this._iModel = vp.iModel;
        this._markers = [];


        this.addMarkers();
    }

    private async getmodlsData()
    {
        const query = 'SELECT ECinstanceid,Origin FROM BisCore.ViewDefinition3d' ;

        const result = this._iModel.query(query);
        const values = [];

        for await(const row of result)
            values.push(row)

        return values;    
    }

    private async addMarkers()
    {
        const values = await this.getmodlsData();

        console.log(values)

        values.forEach(value =>{
            console.log(value.origin.x);
            const geoMarker = new Marker(
                {x:value.origin.x,y:value.origin.y,z:value.origin.z},
                {x:5,y:5}
            );

            const htmlElements = document.createElement("div");
            htmlElements.innerHTML = '<h3>hello marker</h3>'

            geoMarker.htmlElement =htmlElements;

            this._markers.push(geoMarker);
        })

    }

    public decorate(context : DecorateContext) :void{
        this._markers.forEach(marker =>{
            marker.addDecoration(context);
        })
    }
}