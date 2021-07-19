         this.state.locations.map((host, i) => {
           
            <Marker
                draggable
                coordinate={{
                  latitude: host.latitude,
                  longitude: host.longitude,
                }}
                onDragEnd={
                  (e) => alert(JSON.stringify(e.nativeEvent.coordinate))
                }
                onPress={() => {

                  
    

                  global.lat = -23.525365;
                  global.long =  -46.57867

                  navigation.navigate("Information")
                }}
                image={require('../assets/location.png')}
                title={'Test Marker'}
                description={'This is a description of the marker'}
                style={{backgroundColor: 'red'}}
              />}
    
           })