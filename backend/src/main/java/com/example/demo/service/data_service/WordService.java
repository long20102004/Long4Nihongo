package com.example.demo.service.data_service;

import com.example.demo.model.FlashCard;
import com.example.demo.model.Word;
import com.example.demo.repository.WordRepository;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class WordService {
    private WordRepository wordRepository;
    private MongoTemplate mongoTemplate;

    public void deleteById(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update().set("isDeleted", 1);
        mongoTemplate.updateFirst(query, update, Word.class);
    }

    public List<Word> findAll() {
        return wordRepository.findAll();
    }

    public Word save(Word word) {
        return wordRepository.save(word);
    }
    public Word findById(String id){
        return wordRepository.findById(id).get();
    }
    public List<Word> findBySectionId(String sectionId) {
        return wordRepository.findAllByLessonSectionId(sectionId);
    }
}