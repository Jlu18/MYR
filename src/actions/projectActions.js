import * as types from "../constants/ActionTypes";

const sceneRef = "/apiv1/scenes";
const previewRef = "/apiv1/preview/id";

export function asyncUserProj(id) {
    // fetch user's project
    return (dispatch) => {
        if (id) {
<<<<<<< HEAD
            let userVals = [];
            scenes.where("uid", "==", id).get().then(snap => {
                snap.forEach(doc => {
                    storageRef.child(`/images/perspective/${doc.id}`)
                        .getDownloadURL()
                        .catch(() => {
                            console.error("Error: Missing preview image");
                        })
                        .then((img) => {
                            let dat = doc.data();
                            userVals.push({
                                name: dat.name,
                                id: doc.id,
                                data: dat,
                                url: img ? img : "/img/no_preview.jpg"
                            });
=======
            fetch(`${sceneRef}/`, {headers: {"x-access-token": id}}).then((response) =>{
                if(response.status === 200){
                    response.json().then((json) =>{
                        json.forEach(element => {
                            element.url = `${previewRef}/${element._id}`;
>>>>>>> 69cbd0dd60f69d82e839eceb5a0480abd0f0a847
                        });
                        dispatch(syncUserProj(json));
                    });
                }
            });
        }
    };
}

export function syncUserProj(payload) {
    return { type: types.SYNC_USER_PROJ, payload: payload };
}

export const asyncExampleProj = () => {
    // fetch example projects
    return (dispatch) => {
<<<<<<< HEAD
        let exampleVals = [];
        scenes.where("uid", "==", "1").get().then(snap => {
            snap.forEach(doc => {
                storageRef.child(`/images/perspective/${doc.id}`)
                    .getDownloadURL()
                    .catch(() => {
                        console.error("Error: Missing preview image");
                    })
                    .then((img) => {
                        let dat = doc.data();
                        exampleVals.push({
                            name: dat.name,
                            id: doc.id,
                            data: dat,
                            url: img ? img : "/img/no_preview.jpg"
                        });
=======
        fetch(`${sceneRef}/example`).then((response) =>{
            if(response.status === 200){
                response.json().then((json) =>{
                    json.forEach(element => {
                        element.url = `${previewRef}/${element._id}`;
>>>>>>> 69cbd0dd60f69d82e839eceb5a0480abd0f0a847
                    });
                    dispatch(syncExampleProj(json));
                });
            }
        });
    };
};

export function syncExampleProj(payload) {
    return { type: types.SYNC_EXAMP_PROJ, payload: payload };
}

export function deleteProj(uid, id, name) {
    return (dispatch) => {
        if (window.confirm(`Are you sure you want to delete ${name}?`)) {
            //Delete Scene and Image
            fetch(`${sceneRef}/id/${id}`, {method: "delete", headers: {"x-access-token": uid}}).then(response => {
                if(response.status === 204){
                    // Delete Document
                    dispatch({ type: types.DELETE_PROJ, _id: id });
                    if (window.location.href === `${window.origin}/scene/${id}` || window.location.href === `${window.origin}/scene/${id}/`) {
                        window.location.assign(window.origin);
                    }
                    return true;
                }else{
                    return response.json();
                }
            }).then((body) => {
                if(body !== true){
                    console.error("Error deleting scene");
                    console.error(body);

                    alert(`Error Deleting scene ${name}`);
                }
            });
        }
    };
}

/**
 * Saves a scene to MongoDB
 * @param {*} uid The id of the logged in user 
 * @param {*} scene JSON data of the scene to be saved
 * @param {*} img JPEG Image file of the Scene
 * @param {*} sceneID sceneId to be updated, if undefined, creates a new scene
 * 
 * @returns {*} The ID of the saved scene
 */
export async function save(uid, scene, img, sceneID=undefined){
    let id = undefined;
    let url = `${sceneRef}`;
    let method = "POST";
    const headers = {
        "Content-Type": "application/json",
        "x-access-token": uid
    };

    if(sceneID !== undefined){
        method = "PUT";
        url = `${sceneRef}/id/${sceneID}`;
    }
    let resp = await fetch(url, {method: method, body: JSON.stringify(scene), headers: headers});
    
    if(resp.status === 401){
        method = "POST";
        resp = await fetch(sceneRef, {method: method, body: JSON.stringify(scene), headers: headers});
    }

    if(resp.status !== 201 && resp.status !== 200){
        console.error("Could not create new Scene, are you sure you're logged in?");
        return false;
    }
    let json = await resp.json();
    id = json._id;

    if(id === ""){
        console.error("Error receiving scene id from server");
        return false;
    }

    let data = {data: img};
    await fetch(`${previewRef}/${id}`, {method: method, body: JSON.stringify(data), 
        headers: {"Content-Type": "application/json", "x-access-token": uid}})
        .then((resp) => {
            if(resp.status !== 201 && resp.status !== 204){
                console.error("Error sending preview image to server: ", resp.status, resp.statusText);
            }
        });
    return id;
}

export default {
    asyncUserProj,
    syncUserProj,
    asyncExampleProj,
    syncExampleProj,
    deleteProj
};