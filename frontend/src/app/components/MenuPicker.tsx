import { FC, useEffect, useRef, useState } from "react"
import {
    LayoutRectangle,
    Pressable,
    ScrollView,
    StyleSheet,
    View,
    ViewStyle,
    Text,
    Image,
} from "react-native"
import { Menu } from "react-native-paper"

import PickerButton from "./PickerButton";
import { ArrowDown } from "../../assets/images";

interface PickerItem {
    id?: string;
    label?: string;
    value: string | number | null;
}

interface MenuPickerProps {
    data: PickerItem[];
    value?: string | null;
    disabled?: boolean;
    placeHolder?: string,
    pickerView?: ViewStyle;
    onSelect?: (item: string) => void;
}

const MenuPicker: FC<MenuPickerProps> = (props) => {
    const {
        value,
        data = [],
        disabled = false,
        pickerView = {},
        placeHolder = "Select",
        onSelect = () => { },
    } = props

    const pickerLayout = useRef<LayoutRectangle>({
        x: 0,
        y: 0,
        width: 0,
        height: 0,
    })

    const [isDropdownVisible, setIsDropdownVisible] = useState(false)
    const [selectedItem, setSelectedItem] = useState<PickerItem>({ value: placeHolder })

    useEffect(() => {
        if (value) {
            const item = data.find((item) => item.value == value || item.label == value)
            if (item) {
                setSelectedItem(item)
            }
        } else setSelectedItem({ value: placeHolder })
    }, [value, data])

    const renderItem = ({ item }: { item: PickerItem }) => {
        return (
            <PickerButton
                key={item.label}
                label={item.label}
                onPress={() => {
                    setIsDropdownVisible(false)
                    onSelect(`${item.value}`)
                    setSelectedItem(item)
                }}
            />
        )
    }

    return (
        <Menu
            visible={isDropdownVisible}
            onDismiss={() => setIsDropdownVisible(false)}
            style={{
                marginTop: pickerLayout.current.height,
                width: pickerLayout.current.width
            }}
            contentStyle={{ backgroundColor: "white" }}
            anchor={
                <Pressable
                    disabled={disabled}
                    style={[styles.dropdown, {
                        backgroundColor: "white",
                        opacity: disabled ? 0.5 : 1,
                    }, pickerView]}
                    onLayout={({ nativeEvent }) => {
                        pickerLayout.current = nativeEvent.layout
                    }}
                    onPress={() => {
                        setIsDropdownVisible(true)
                    }}>
                    <Text style={styles.dropdownText}>
                        {`${selectedItem?.label ?? placeHolder}`}
                    </Text>
                    <Image
                        source={ArrowDown}
                        style={styles.arrowDownIcon}
                    />
                </Pressable>
            }>
            <View style={{ maxHeight: 500 }}>
                <ScrollView>
                    {data.map((item) => renderItem({ item }))}
                </ScrollView>
            </View>
        </Menu>
    )
}

const styles = StyleSheet.create({
    dropdown: {
        height: 38,
        width: "100%",
        borderRadius: 7,
        alignItems: 'center',
        flexDirection: 'row',
        paddingHorizontal: 10,
        justifyContent: "space-between",
    },
    dropdownText: {
        fontSize: 14,
        marginRight: 4,
        color: '#000',
        fontWeight: "400"
    },
    arrowDownIcon: {
        width: 16,
        height: 16
    }
})

export default MenuPicker