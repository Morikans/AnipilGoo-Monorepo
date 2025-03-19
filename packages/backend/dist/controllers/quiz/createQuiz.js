"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createQuiz = void 0;
// アニメデータをfetch
const createQuiz = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const animeDataResponse = yield fetch("https://api.jikan.moe/v4/anime?order_by=members&sort=desc");
        const { data: animeData } = yield animeDataResponse.json(); // JSON に変換
        if (!animeData || animeData.length === 0) {
            res.status(404).json({ message: "アニメデータが見つかりません" });
            return;
        }
        const top100Anime = animeData.slice(0, 100).map((anime) => ({
            id: anime.mal_id,
            title: anime.title,
            synopsis: anime.synopsis,
            members: anime.members, // 視聴者数
            score: anime.score, // 平均スコア
            image_url: anime.images.jpg.image_url,
        }));
        // ランダムに1つのアニメを選択
        const randomAnime = animeData[Math.floor(Math.random() * top100Anime.length)];
        res.status(200).json({
            top100Anime,
        });
    }
    catch (error) {
        console.error("アニメデータの取得に失敗しました", error);
        res.status(500).json({ message: "アニメデータの取得に失敗しました" });
    }
});
exports.createQuiz = createQuiz;
