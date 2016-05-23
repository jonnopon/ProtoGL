//TODO
/*
this allows generic getting of entity information in a shader
EG: variable (attribute/uniform) "col [vec4]" in shader will be auto-populated with the entity's Vec4 col

add new entries to the list to define new retrievable properties - can be done in the app code or as direct extension of engine code
 */

var ENTITY_ATTRIBUTE_MAP = {
    //TODO: always more to add...
    col: {
        component: "flatColor",
        property: "color"
    },
    transform2D: {
        component: "transform2D",
        property: "transform"
    },
    transform3D: {
        component: "transform3D",
        property: "transform"
    }
};