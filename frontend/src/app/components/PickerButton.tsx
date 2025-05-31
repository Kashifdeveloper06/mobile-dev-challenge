import { Pressable, StyleSheet, Text } from "react-native";

interface PickerButtonProps {
    id?: string;
    label?: string;
    value?: string;
    onPress: () => void;
}

const PickerButton: React.FC<PickerButtonProps> = (props) => {
    const {
        label = "",
        onPress,
    } = props
    return (
        <Pressable
            style={styles.pickerButton}
            onPress={onPress}>
            <Text>{`${label}`}</Text>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    pickerButton: {
        paddingVertical: 10,
        paddingHorizontal: 16,
    },
})

export default PickerButton