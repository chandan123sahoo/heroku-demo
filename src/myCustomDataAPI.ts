export class myCustomDataAPI{

    public static async getData(){

        const response = await fetch("https://cognizant-location360-gs.azurewebsites.net/geoserver/pocs_workspace/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=pocs_workspace%3ASTRUCTURES_POC&maxFeatures=1000000&outputFormat=application%2Fjson");

        const datainreturn = response.json();
    }

}