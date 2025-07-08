import React, { useRef, useState } from 'react';
import {
  View,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  Pressable,
  Text,
  Modal,
} from 'react-native';

const { width: screenWidth, height: screenHeight } = Dimensions.get('window');

export default function Index() {
const imageWidth = 1000;
const imageHeight = 1000;

const maxTranslateX = 0;
const minTranslateX = screenWidth - imageWidth; // ex: 390 - 1000 = -610

const maxTranslateY = 0;
const minTranslateY = screenHeight - imageHeight; // ex: 844 - 1000 = -156








  const [modalVisible, setModalVisible] = useState(false);
  const [infoPin, setInfoPin] = useState('');


const pan = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

// Guarda la posición acumulada en una ref manual
const position = useRef({ x: 0, y: 0 }).current;

const panResponder = useRef(
  PanResponder.create({
    onMoveShouldSetPanResponder: () => true,

    onPanResponderGrant: () => {
      pan.setOffset({ x: position.x, y: position.y });
      pan.setValue({ x: 0, y: 0 }); // reinicia el delta
    },

    onPanResponderMove: (_, gestureState) => {
      let newX = position.x + gestureState.dx;
      let newY = position.y + gestureState.dy;

      // Limitar dentro de los bordes
      const clampedX = Math.min(Math.max(newX, minTranslateX), maxTranslateX);
      const clampedY = Math.min(Math.max(newY, minTranslateY), maxTranslateY);

      // Aplica delta relativo
      pan.setValue({
        x: clampedX - position.x,
        y: clampedY - position.y,
      });
    },

    onPanResponderRelease: () => {
      pan.flattenOffset();

      // Agrega el delta acumulado manualmente
      pan.extractOffset(); // para mantener visual correctamente
      pan.addListener((val) => {
        position.x = val.x;
        position.y = val.y;
      });
    },
  })
).current;




  // Aquí defines la posición del pin respecto a la imagen
  const pines = [
    { id: 'pin1', top: 200, left: 150, texto: 'Pin 1' },
    { id: 'pin2', top: 500, left: 300, texto: 'Pin 2' },
  ];

  return (
    <View className="flex-1 bg-white">
      <Animated.View className={'w-[936] h-[541] '}
        style={[
          {
           transform: [{ translateX: pan.x }, { translateY: pan.y }],
          },
        ]}
        {...panResponder.panHandlers}
      >
        {/* Imagen base */}
        <Image
           source={require('../../assets/images/Mapa.png')} className='w-[1000] h-[1000] absolute'
        />

        {/* Pines */}
        {pines.map((pin) => (
          <Pressable
            key={pin.id}
            onPress={() => {
              setInfoPin(pin.texto);
              setModalVisible(true);
            }}
            style={{
              position: 'absolute',
              top: pin.top,
              left: pin.left,
              width: 30,
              height: 30,
              borderRadius: 15,
              backgroundColor: 'red',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text style={{ color: 'white', fontSize: 12 }}>📍</Text>
          </Pressable>
        ))}
      </Animated.View>

      {/* Modal */}
      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 justify-center items-center bg-black/40">
          <View className="bg-white p-5 rounded-xl  w-96 h-96">
            <Text className="text-lg mb-3">{infoPin}</Text>
            <View className='flex-row'>
              <Image source={require('../../assets/images/cont.jpg')} className='w-36 h-36'></Image>
              <View className='gap-1'>
                <Text className='font-work-medium text-xl'>ola</Text>
                <Text className='bg-orange-400 w-52 rounded-md p-2 font-work-medium text-xl'>ola</Text>
              <Text className='font-work-medium text-xl'>ola</Text>
              <Text className='bg-orange-400 w-52 rounded-md p-2 font-work-medium text-xl'>ola</Text>
              </View>
              
            </View>

            <Pressable
              className="bg-blue-500 px-4 py-2 rounded"
              onPress={() => setModalVisible(false)}
            >
              <Text className="text-white">Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}
