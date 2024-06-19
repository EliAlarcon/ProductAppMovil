import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  textRedirection: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-end",
  },
  icon:{
    width: 32,
    height: 32
  },
  loading:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  card:{
    flex: 1,
    backgroundColor: '#f9f9f9',
    margin: 3
  },
  noImage: {
    width: '100%',
    height: 200
  },
  image:{
    flex: 1,
    width: '100%',
    height: 200,
  },
});
