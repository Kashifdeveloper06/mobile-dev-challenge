import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Button } from 'react-native-paper';
import MenuPicker from './MenuPicker';
import { useFilter } from '../filterContext/FilterContext';

const NoodleFilters: React.FC = () => {

    const {
        spicinessLevel,
        setSpicinessLevel,
        selectedCountry,
        setSelectedCountry,
    } = useFilter();

    const showClear = spicinessLevel || selectedCountry;

    return (
        <>
            <View style={styles.filtersContainer}>
                <View style={{ flex: 1 }}>
                    <MenuPicker
                        value={spicinessLevel}
                        placeHolder="Spiciness Level"
                        onSelect={setSpicinessLevel}
                        data={[
                            { label: 'Level 1', value: 1 },
                            { label: 'Level 2', value: 2 },
                            { label: 'Level 3', value: 3 },
                            { label: 'Level 4', value: 4 },
                            { label: 'Level 5', value: 5 },
                        ]}
                    />
                </View>
                <View style={{ flex: 1 }}>
                    <MenuPicker
                        value={selectedCountry}
                        placeHolder="Origin Country"
                        onSelect={setSelectedCountry}
                        data={[
                            { label: 'South Korea', value: 'south_korea' },
                            { label: 'Indonesia', value: 'indonesia' },
                            { label: 'Malaysia', value: 'malaysia' },
                            { label: 'Thailand', value: 'thailand' },
                            { label: 'Japan', value: 'japan' },
                            { label: 'Singapore', value: 'singapore' },
                            { label: 'Vietnam', value: 'vietnam' },
                            { label: 'China', value: 'china' },
                            { label: 'Taiwan', value: 'taiwan' },
                            { label: 'Philippines', value: 'philippines' },
                        ]}
                    />
                </View>
            </View>

            {showClear && (
                <Button
                    style={styles.clearFilterButton}
                    onPress={() => {
                        setSpicinessLevel(null);
                        setSelectedCountry(null);
                    }}
                >
                    Clear Filter
                </Button>
            )}
        </>
    );
};

const styles = StyleSheet.create({
    filtersContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 10,
    },
    clearFilterButton: {
        backgroundColor: 'white',
        borderRadius: 10,
    },
});

export default NoodleFilters;
