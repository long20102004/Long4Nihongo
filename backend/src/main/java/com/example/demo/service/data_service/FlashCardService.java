package com.example.demo.service.data_service;

import com.example.demo.model.FlashCard;
import com.example.demo.repository.FlashCardRepository;
import lombok.AllArgsConstructor;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class FlashCardService {
    private FlashCardRepository flashCardRepository;
    private MongoTemplate mongoTemplate;
    public void deleteById(String id) {
        Query query = new Query(Criteria.where("_id").is(id));
        Update update = new Update().set("isDeleted", 1);
        mongoTemplate.updateFirst(query, update, FlashCard.class);
    }
    public List<FlashCard> findBySectionId(String sectionId){
        return flashCardRepository.findAllByLessonSectionId(sectionId);
    }
    public List<FlashCard> findAll(){
        return flashCardRepository.findAll();
    }
    public void save(FlashCard flashCard){
        flashCardRepository.save(flashCard);
    }
    public FlashCard findById(String id){
        return flashCardRepository.findById(id).get();
    }
}