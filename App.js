import { useState } from 'react';
import { StyleSheet, SafeAreaView, View, ScrollView, Text, Image, Pressable, Modal, TextInput, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// 8 affirmation with their corresponding meanings stored into objects
const affirmations = [
  { quote: "You are capable of achieving your goals.", meaning: "You have the strength and resources to succeed." },
  { quote: "You are deserving of happiness and success.", meaning: "You don't need to earn joy or prosperity — they are your right." },
  { quote: "You are stronger than you think.", meaning: "Your resilience will carry you through tough times." },
  { quote: "You have everything within you to overcome challenges.", meaning: "Your inner strength and wisdom are enough to face any obstacle." },
  { quote: "You are worthy of love and kindness.", meaning: "You deserve to be treated with respect and compassion." },
  { quote: "You have the power to create change.", meaning: "Small actions lead to big transformations — trust your influence." },
  { quote: "You are in control of your thoughts and feelings.", meaning: "Your mindset and emotional responses are within your control." },
  { quote: "You are always growing and evolving.", meaning: "Embrace change — it's part of your personal journey." }
];

export default function App() {
  //contols weather the "Home" modal is shown initially true to show intro screen
  //when get pressed is clicked setmodalvisible changes to false
  const [modalVisible, setModalVisible] = useState(true);
  // holds the currently selected affirmation to,when get affirmation is pressed a random one is picked and stored using setAffirmation(...)
  // when closes the modal it resets to null
  
  const [currentAffirmation, setCurrentAffirmation] = useState(null);
  // stores user's name from Text input
  // when user types onChange text gets updated
  const [name, setName] = useState('');
  // Array of favorite affirmation saved by the user
  // when user hearts a quote 
  const [favorites, setFavorites] = useState([]);
  // controls visibility of the favorites modal
  //setShowFavoritesModal(true) and false when opening or closing the modal.
  const [showFavoritesModal, setShowFavoritesModal] = useState(false);
  // controlls visiblity of the info/Modal

  const [showInfoModal, setShowInfoModal] = useState(false);
  // hides the home modal and start the app

  const startApp = () => setModalVisible(false);
// selects a random affirmation from list and sets it as current
  const displayAffirmation = () => {
    const random = affirmations[Math.floor(Math.random() * affirmations.length)];
    setCurrentAffirmation(random);
  };
// resets to inital state and then will return to home modal
  const goHome = () => {
    setModalVisible(true);
    setCurrentAffirmation(null);
    setName('');
    setFavorites([]);
    setShowFavoritesModal(false);
  };
//closes the currently displayed modal
  const closeAffirmationModal = () => {
    setCurrentAffirmation(null);
  };
  //add current affirmation to favorites if it is not saved already saved
  const addToFavorites = () => {
    if (currentAffirmation && !favorites.some(fav => fav.quote === currentAffirmation.quote)) {
      setFavorites([...favorites, currentAffirmation]);
    }


  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {/*Home modal that is shown by app launch*/}
        <Modal visible={modalVisible} animationType="fade">
          <View style={styles.homeContainer}>
            <Image source={require('./assets/logo.png')} style={styles.logo} />
            <Text style={styles.homeTitle}>Affirm.Me</Text>
            <Pressable style={styles.getStartedButton} onPress={startApp}>
              <Text style={styles.getStartedButtonText}>Get Started</Text>
            </Pressable>
          </View>
        </Modal>

        <View style={styles.container}>
          {/*home icon that resets app*/}
          <Pressable onPress={goHome} style={styles.homeButton}>
            <Ionicons name="home" size={30} color="#4CAF50" />
          </Pressable>


          <View style={styles.topRightIcons}>
            
          {/*information icon to show user how to use app*/}
            <Pressable onPress={() => setShowInfoModal(true)} style={styles.infoButton}>
              <Ionicons name="information-circle-outline" size={30} color="#4CAF50" />
            </Pressable>
          </View>


          <Image source={require('./assets/logo.png')} style={styles.logoSmall} />
          <Text style={styles.title}>Daily Affirmation Generator</Text>
          <Text style={styles.instructions}>Enter your name and get your affirmation!</Text>

          {/*text input for when user enters their name*/}
          <TextInput
            style={styles.input}
            placeholder="Enter your name"
            value={name}
            onChangeText={setName}
          />
          {/*button to get new affirmation*/}
          <Pressable style={styles.button} onPress={displayAffirmation}>
            <Text style={styles.buttonText}>Get Affirmation</Text>
          </Pressable>

          {/*view favorites button*/}
          <View style={styles.bottomButtons}>
            <Pressable style={styles.viewFavoritesButton} onPress={() => setShowFavoritesModal(true)}>
              <Text style={styles.buttonText}>View Favorites</Text>
            </Pressable>
          </View>
          {/*modal that shows current affirmation*/}
          <Modal
            transparent={true}
            animationType="slide"
            visible={currentAffirmation !== null}
            onRequestClose={closeAffirmationModal}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalView}>
                <Text style={styles.quote}>
                  {name ? `${name}, ` : ''}"{currentAffirmation?.quote}"
                </Text>
                <Text style={styles.meaning}>{currentAffirmation?.meaning}</Text>
                {/*buttons inside affirmation modal*/}
                <View style={styles.modalButtons}>
                  {/*Heart icon to favorite the quote*/}
                  <Pressable style={styles.favoriteButton} onPress={addToFavorites}>
                    
                    <Ionicons
                      name={favorites.some(fav => fav.quote === currentAffirmation?.quote) ? 'heart' : 'heart-outline'}
                      size={30}
                      color="#FF4081"
                    />
                  </Pressable>

                  {/*close button for affirmation modal*/}

                  <Pressable style={styles.closeButton} onPress={closeAffirmationModal}>
                    <Text style={styles.closeButtonText}>Close</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
        {/*Favorites modal*/}
          <Modal
            transparent={true}
            visible={showFavoritesModal}
            animationType="slide"
            onRequestClose={() => setShowFavoritesModal(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>Your Favorites ❤️</Text>
                <FlatList
                  data={favorites}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <Text style={styles.favoriteQuote}>"{item.quote}"</Text>
                  )}
                />
                <Pressable style={styles.closeButton} onPress={() => setShowFavoritesModal(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>
          <Modal
            transparent={true}
            visible={showInfoModal}
            animationType="fade"
            onRequestClose={() => setShowInfoModal(false)}
          >
            <View style={styles.modalBackground}>
              <View style={styles.modalView}>
                <Text style={styles.modalTitle}>How to Use</Text>
                <Text style={styles.modalText}>
                  1. Enter your name in the input box.{"\n\n"}
                  2. Tap "Get Affirmation" to receive a motivational quote.{"\n\n"}
                  3. Tap the heart icon to save it as a favorite.{"\n\n"}
                  4. Tap "View Favorites" to see saved affirmations.{"\n\n"}
                  5. Use the home icon to return to the start.
                </Text>
                <Pressable style={styles.closeButton} onPress={() => setShowInfoModal(false)}>
                  <Text style={styles.closeButtonText}>Close</Text>
                </Pressable>
              </View>
            </View>
          </Modal>

        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#4F7942'
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  container: {
    flex: 1,
    backgroundColor: '#E8F5E9',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    borderRadius: 12,
    width: '100%',
    maxWidth: 350,
    elevation: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 10 }
  },
  homeContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4F7942',
    padding: 20
  },
  homeTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
     marginBottom: 40,
    textAlign: 'center'
  },

  logo: {
    width: 200,
    height: 200,
    marginBottom: 30,
    resizeMode: 'contain'
  },

  logoSmall: {
    width: 100,
    height: 100,
    marginBottom: 20,
    resizeMode: 'contain'
  },
  homeButton: {
    position: 'absolute',
    top: 20,
    left: 20
  },
  getStartedButton: {
    backgroundColor: 'white',
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 10, elevation: 5
  },
  getStartedButtonText: {
    color: '#4F7942',
    fontWeight: 'bold',
    fontSize: 18
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2C6B2F',
    marginBottom: 10,
    textAlign: 'center'
  },
  instructions: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    height: 50,
    borderColor: '#2C6B2F',
    borderWidth: 1,
    paddingHorizontal: 15,
    borderRadius: 8,
    width: '90%',
    marginBottom: 20,
    backgroundColor: '#fff',
    fontSize: 16
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 10,
    elevation: 5,
    marginBottom: 20
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    textAlign: 'center'
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20, width: '100%'
  },
  viewFavoritesButton: {
    backgroundColor: '#00BCD4',
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5
  },
  favoriteQuote: {
    fontSize: 16,
    color: '#555',
    marginBottom: 10,
    textAlign: 'center'
  },
  modalBackground: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)'
  },
  modalView: {
    backgroundColor: 'white',
    padding: 30,
    borderRadius: 20,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.25,
    shadowRadius: 4,
    shadowOffset: { width: 0, height: 2 }
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2C6B2F',
    marginBottom: 20
  },
  quote: {
    fontSize: 22,
    fontWeight: '600',
    color: '#2C6B2F',
    marginBottom: 20,
    textAlign: 'center'
  },
  meaning: {
    fontSize: 16,
    color: '#555', textAlign: 'center',
    marginBottom: 20
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%'
  },
  favoriteButton: {
    padding: 10
  },

  closeButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginTop: 10
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold'
  },
  topRightIcons: {
    position: 'absolute',
    top: 20,
    right: 20
  },
  
  infoButton: {
    

  },
  modalText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'left',
    marginBottom: 20
  },

});

