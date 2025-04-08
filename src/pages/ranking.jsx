import React from 'react';
import Header from '../components/Header';
import fondo from '../assets/fondo.svg';
import pizarra from '../assets/pizarra.svg';
import Ranking from '../components/Ranking';
import TextToSpeech from '../components/TextToSpeech';

const RankingPage = () => {
    return (
        <div>
            <Header />
            <div className="container mx-auto p-4">
                <TextToSpeech />
                <Ranking />
            </div>
        </div>
    );
};

export default RankingPage; 