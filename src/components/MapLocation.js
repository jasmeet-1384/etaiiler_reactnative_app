import React, { Component}  from 'react'
import {View, StyleSheet, KeyboardAvoidingView, Text, TextInput, Platform, PermissionsAndroid, TouchableOpacity} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons';

import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'

import Geolocation from 'react-native-geolocation-service';

const styles = StyleSheet.create({
    map: {
        flex: 1,
    },
    buttonText: {
        textAlign: 'center',
        color: '#ffffff',
        fontFamily: 'BebasNeue-Regular',
        fontSize: 21
    },
    button: {
        flexDirection: 'column',
        width: '75%',
        backgroundColor: '#d43e3a',
        height: 36,
        justifyContent: 'center',
        borderRadius: 16,
    },
    panelFill: {
        position: "absolute",
        marginTop: 10,
        alignSelf: "stretch",
        right: 0,
        left: 0,
        marginHorizontal: 10
    },
    panel: {
        position: "absolute",
        marginTop: 10,
        alignSelf: "stretch",
        right: 0,
        left: 0,
        flex: 1,
        marginHorizontal: 10
    },
})


class MapLocation extends Component {
    
    constructor(props) {
        super(props)

        this.mapView=null
        this.state = {
            region: {
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
                latitude: 23.52493661187678,
                longitude:  87.25461375195775
            },
            padding: 0,
            address: '',
            locationStatus : '',
            forceRefresh: 0,
            listViewDisplayed: null
        }

        this.from = this.props.route.params.fromScreen    
        this.sendAddressToPrevScreen = this.sendAddressToPrevScreen.bind(this)
        this.getOneTimeLocation = this.getOneTimeLocation.bind(this)
        this.goToInitialLocation = this.goToInitialLocation.bind(this)
    }

    async componentDidMount() {
        console.log("From screen ===> ", this.from)
        setTimeout(()=>this.setState({padding: 0}),500);
        // this.getCoordinates()
        if(Platform.OS === "ios") {

        } else {
            try {
                let granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
                    {
                        title: 'Location Access Required',
                        message: 'This App needs to Access your location',
                    },
                );

                if(granted === PermissionsAndroid.RESULTS.GRANTED) {
                    this.getOneTimeLocation()
                } else {
                    this.setState({
                        locationStatus: 'Permission Denied'
                    })
                }
            } catch (err) {
                console.warn(err)
            }
        }
        // this.getAddress()
    }

    getOneTimeLocation(){
        console.log("Taking to home location")
        this.setState({
            locationStatus: 'Getting location!!'
        })
        Geolocation.getCurrentPosition(
          //Will give you the current location
          (position) => {
            this.setState({
                locationStatus: 'You are here!!'
            })
            // console.log("Position from geolocation ===> ", position)
            //getting the Longitude from the location json
            let currentLongitude = 
              JSON.stringify(position.coords.longitude);
    
            //getting the Latitude from the location json
            let currentLatitude = 
              JSON.stringify(position.coords.latitude);
            
              console.log("Ontime => ", currentLongitude, currentLatitude)
            
            this.setState({
                region: {
                    ["latitude"]: parseFloat(currentLatitude),
                    ["longitude"]: parseFloat(currentLongitude),
                    ["latitudeDelta"]: 0.005,
                    ["longitudeDelta"]: 0.005
                }
            })
            this.mapView.animateToRegion(this.state.region, 1500);
          },
          (error) => {
            this.setState({
                locationStatus: error.message
            })
          },
          {
            enableHighAccuracy: true,
            timeout: 30000,
            maximumAge: 1000
          },
        );
    };

    goToInitialLocation = (region) => {
        let initialRegion = Object.assign({}, region);
        initialRegion["latitudeDelta"] = 0.005;
        initialRegion["longitudeDelta"] = 0.005;
      this.mapView.animateToRegion(initialRegion, 2000);
   };

   sendAddressToPrevScreen() {
       this.props.navigation.navigate(this.from, {
           address: this.state.address,
           latitude: this.state.region.latitude,
           longitude: this.state.region.longitude
       })
   }

    getAddress() {
        // console.log("https://maps.googleapis.com/maps/api/geocode/json?latlng="+this.state.region.latitude+","+this.state.region.longitude+"&key="+"AIzaSyBQOapBWczHP4rn_PXkZmIHZZbL6UeN8IU")
        fetch("https://maps.googleapis.com/maps/api/geocode/json?latlng="+this.state.region.latitude+","+this.state.region.longitude+"&key="+"AIzaSyBQOapBWczHP4rn_PXkZmIHZZbL6UeN8IU")
        .then((response) => response.json())
        .then((data) => {
            // console.log("Geocode is => ", JSON.stringify(data))
            this.setState({
                address: data.results[0].formatted_address
            })
        })
    }

    onRegionChange = (region) => {
        this.setState({
            region: region,
            forceRefresh: Math.floor(Math.random() * 100),
        },
        this.getAddress
        );
    };

    render() {
        console.log(this.state.locationStatus)
        return(
            <View style={{...styles.map, padding: this.state.padding}}>

                <MapView
                    ref={(ref) => (this.mapView = ref)} 
                    provider={PROVIDER_GOOGLE}
                    style={styles.map} 
                    initialRegion = {this.state.region}
                    showsUserLocation={true}
                    onRegionChangeComplete={this.onRegionChange}
                    showsCompass={false}
                    loadingEnabled={true}
                >
                </MapView>

                <View style={[this.state.listViewDisplayed ? styles.panelFill : styles.panel]}>
                    <GooglePlacesAutocomplete
                        currentLocation={false}
                        enableHighAccuracyLocation={true}
                        ref={(c) => (this.searchText = c)}
                        placeholder='Enter Kitchen Location'
                        listViewDisplayed={this.state.listViewDisplayed}
                        minLength={2}
                        autoFocus={false}
                        returnKeyType={"search"}
                        // listViewDisplayed={this.state.listViewDisplayed}
                        fetchDetails={true}
                        renderDescription={(row) => row.description}
                        enablePoweredByContainer={false}
                        listUnderlayColor="lightgrey"
                        onPress={(data, details) => {
                            this.setState({
                                listViewDisplayed: false,
                                address: data.description,
                                currentLat: details.geometry.location.lat,
                                currentLng: details.geometry.location.lng,
                                region: {
                                latitudeDelta: 0.005,
                                longitudeDelta: 0.005,
                                latitude: details.geometry.location.lat,
                                longitude:details.geometry.location.lng,
                            },
                        });
                        this.searchText.setAddressText("");
                        this.goToInitialLocation(this.state.region);}}
                        textInputProps={{
                            onChangeText: (text) => {
                                console.log(text);
                                this.setState({listViewDisplayed: true});
                            },
                        }}
                        getDefaultValue={() => {
                            return ""; // text input default value
                        }}
                        query={{
                            key: 'AIzaSyBQOapBWczHP4rn_PXkZmIHZZbL6UeN8IU',
                            language: 'en',
                            components: 'country:in'
                        }}
                        styles={{
                            description: {
                                fontFamily: "opensans_semibold",
                                color: "black",
                                fontSize: 14,
                                },
                            predefinedPlacesDescription: {
                                color: "black",
                            },
                            listView: {
                                position: "absolute",
                                marginTop: 44,
                                backgroundColor:"white",
                                borderBottomEndRadius: 15,
                                elevation:2
                            },
                            container: {
                                width: '100%',   
                            },
                            textInput: {
                                borderColor:'#113c53',
                                borderWidth: 1,
                                borderRadius: 12,
                                fontSize: 16
                            }
                        }}
                        nearbyPlacesAPI="GooglePlacesSearch"
                        GooglePlacesSearchQuery={{
                            rankby: "distance",
                            types: "building",
                        }}
                        filterReverseGeocodingByTypes={[
                            "locality","administrative_area_level_3",
                        ]}
                        debounce={200}
                    />
                </View>


                <View pointerEvents="none" style={{position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, justifyContent: 'center', alignItems: 'center'}}>
                    <View style={{width: 35, height: 35, marginTop: -35}}>
                        <Icon pointerEvents="none" name={"location-sharp"} size={35}/>
                    </View>
                </View>
                <View style={{height: '25%', width: '100%', backgroundColor: '#fff', position: 'absolute', bottom: 0}}>
                    <View style={{flex: 1,alignItems: 'center', paddingHorizontal: 10, borderBottomColor: '#e4e4e4', borderBottomWidth: 2, flexDirection: 'row', justifyContent: 'space-between'}}>
                        <Text style={{fontFamily: 'opensans_semibold', fontSize: 18}}>Select Kitchen Location</Text>
                        <TouchableOpacity onPress={this.getOneTimeLocation.bind(this)} style={{alignItems: 'center'}}>
                            <Text style={{fontFamily: 'opensans_semibold'}}>Recenter</Text>  
                            <Icon name={"locate-sharp"} size={30}/>
                        </TouchableOpacity>
                        
                    </View>
                    <View style={{flex: 1, paddingLeft: 10, borderBottomColor: '#e4e4e4', borderBottomWidth: 2, paddingVertical: 4}}>
                        <Text style={{fontFamily: 'opensans_semibold', fontSize: 12, flex: 1}}>Selected Location : </Text>
                        <Text style={{fontFamily: 'opensans_semibold', fontSize: 14, flex: 2}}>{this.state.address}</Text>
                    </View>
                    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                    <TouchableOpacity activeOpacity={.85} style={styles.button} onPress={this.sendAddressToPrevScreen}><Text style={styles.buttonText}>CONFIRM LOCATION</Text></TouchableOpacity>
                    </View> 
                </View>
            </View>
        )
    }
}

export default MapLocation