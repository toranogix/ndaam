// ProfileScreen.js
import React from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, ScrollView, Image, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Helper for icon colors
const iconBackgroundColors = {
  'person-outline': '#E0F3FF',
  'receipt-outline': '#E0FFF1',
  'refresh-outline': '#FFEBE0',
  'shield-outline': '#FFF9E0',
  'notifications-outline': '#E0F3FF',
  'language-outline': '#E6E0FF',
  'color-palette-outline': '#FCE0FF',
  'help-circle-outline': '#E0FFF1',
  'chatbubble-outline': '#E0FFFA',
};

const iconColors = {
    'person-outline': '#3B82F6',
    'receipt-outline': '#10B981',
    'refresh-outline': '#F97316',
    'shield-outline': '#F59E0B',
    'notifications-outline': '#3B82F6',
    'language-outline': '#8B5CF6',
    'color-palette-outline': '#D946EF',
    'help-circle-outline': '#10B981',
    'chatbubble-outline': '#14B8A6',
};

const ProfileSectionItem = ({ icon, title, isLast }) => (
    <TouchableOpacity
        className={`flex-row items-center justify-between py-4 ${!isLast ? 'border-b border-gray-100' : ''}`}
        activeOpacity={0.7}
    >
        <View className="flex-row items-center">
            <View style={[styles.iconContainer, { backgroundColor: iconBackgroundColors[icon] || '#EFEFEF' }]}>
                <Ionicons name={icon} size={20} style={{ color: iconColors[icon] || '#333' }} />
            </View>
            <Text className="font-candy_season text-gray-800 text-sm ml-4">{title}</Text>
        </View>
        <Ionicons name="chevron-forward" size={20} color="#D1D5DB" />
    </TouchableOpacity>
);

const ProfileScreen = () => {
    return (
        <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
            {/* Header */}
            <View style={styles.headerContainer}>
                <View className="flex-row justify-between items-center w-full px-6 pt-4">
                    <Text className="font-candy_season text-black text-2xl">Profil</Text>
                    <TouchableOpacity>
                        <Ionicons name="ellipsis-horizontal" size={24} color="black" />
                    </TouchableOpacity>
                </View>
                <View className="items-center mt-4">
                    <View>
                        <Image
                            source={require('../../assets/pain_pp.jpg')}
                            className="w-24 h-24 rounded-full border-white"
                        />
                        <TouchableOpacity
                            className="absolute bottom-0 right-0 bg-orange-400 p-2 rounded-full border-2 border-green-900"
                        >
                            <Ionicons name="pencil-outline" size={16} color="white" />
                        </TouchableOpacity>
                    </View>
                    <Text className="font-candy_season text-black text-xl mt-3">Toranogix</Text>
                    <Text className="font-candy_season text-black text-sm">toranogix@gmail.com</Text>
                </View>
            </View>

            {/* Content */}
            <ScrollView
                showsVerticalScrollIndicator={false}
                style={styles.contentContainer}
                contentContainerStyle={{ paddingBottom: 100 }}
            >
                <View className="px-6">
                    <Text className="font-candy_season text-black text-lg mb-2 mt-6">Compte</Text>
                    
                    <View className="bg-white rounded-2xl p-4">
                        <ProfileSectionItem icon="person-outline" title="Informations personnelles" />
                        <ProfileSectionItem icon="receipt-outline" title="Historique des commandes" />
                        <ProfileSectionItem icon="refresh-outline" title="Retours et échanges" />
                        <ProfileSectionItem icon="shield-outline" title="Sécurité" isLast/>
                    </View>

                    <Text className="font-candy_season text-black text-lg mb-2 mt-6">Préférences</Text>
                    <View className="bg-white rounded-2xl p-4">
                        <ProfileSectionItem icon="notifications-outline" title="Notifications" />
                        <ProfileSectionItem icon="language-outline" title="Langue" />
                        <ProfileSectionItem icon="color-palette-outline" title="Thème" isLast/>
                    </View>

                    <Text className="font-candy_season text-black text-lg mb-2 mt-6">Aide</Text>
                    <View className="bg-white rounded-2xl p-4">
                        <ProfileSectionItem icon="help-circle-outline" title="Aide et FAQ" />
                        <ProfileSectionItem icon="chatbubble-outline" title="Contactez-nous" isLast/>
                    </View>

                    <TouchableOpacity 
                        className="bg-red-100 py-4 rounded-2xl items-center mt-8"
                        activeOpacity={0.7}
                    >
                        <Text className="font-candy_season text-red-600 text-sm">SE DÉCONNECTER</Text>
                    </TouchableOpacity>

                    <View className="items-center mt-8 mb-4">
                        <Text className="font-candy_season text-gray-400 text-xs">NDAAM v1.0.0</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    headerContainer: {
        backgroundColor: 'white',
        height: 280,
        borderBottomLeftRadius: 40,
        borderBottomRightRadius: 40,
        paddingTop: 40,
    },
    contentContainer: {
        flex: 1,
        backgroundColor: 'white',
        borderTopLeftRadius: 40,
        borderTopRightRadius: 40,
        marginTop: -40,
    },
    iconContainer: {
        width: 40,
        height: 40,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default ProfileScreen;